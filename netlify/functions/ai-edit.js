const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};

function json(statusCode, body) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  };
}

function extractJson(content) {
  const trimmed = content.trim();
  if (trimmed.startsWith("{")) return JSON.parse(trimmed);
  const match = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) return JSON.parse(match[1]);
  throw new Error("AI response did not contain valid JSON.");
}

function systemPrompt() {
  return [
    "You are an editing assistant for Mega Furnit, a B2B furniture manufacturing and supply chain website.",
    "Return only valid JSON. Do not include markdown.",
    "Never add ecommerce, cart, checkout, pricing, inventory, or payment content.",
    "Keep tone professional, practical, international, and B2B.",
    "The JSON must use this shape:",
    "{ \"draft\": { \"siteContent\": { \"en\": {}, \"es\": {}, \"zh\": {} }, \"product\": null } }",
    "For product description generation, return product fields under draft.product and keep siteContent empty.",
    "For page editing or translation, return edited fields under draft.siteContent and product as null.",
    "Only include fields relevant to the request."
  ].join(" ");
}

function userPrompt(payload) {
  return JSON.stringify({
    task: payload.action,
    selectedLanguage: payload.language,
    selectedPage: payload.page,
    instructions: payload.instructions || "",
    currentSiteContent: payload.siteContent || {},
    currentProduct: payload.product || null,
    supportedLanguages: ["en", "es", "zh"],
    allowedSiteFields: [
      "heroTitle",
      "heroText",
      "viewProducts",
      "supplyText",
      "capabilitiesIntro",
      "aboutIntro",
      "aboutBody",
      "contactIntro",
      "formNote"
    ],
    allowedProductFields: [
      "name",
      "category",
      "categoryKey",
      "description",
      "dimensions",
      "materials",
      "image"
    ]
  });
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return json(500, {
      error: "OPENAI_API_KEY is missing. Add it in Netlify environment variables before using the AI Assistant."
    });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return json(400, { error: "Invalid JSON request body." });
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt() },
          { role: "user", content: userPrompt(payload) }
        ]
      })
    });

    const result = await response.json();
    if (!response.ok) {
      return json(response.status, {
        error: result.error?.message || "OpenAI request failed."
      });
    }

    const content = result.choices?.[0]?.message?.content;
    if (!content) {
      return json(502, { error: "OpenAI returned an empty response." });
    }

    const parsed = extractJson(content);
    if (!parsed.draft) {
      return json(502, { error: "AI response did not include a draft object." });
    }

    return json(200, parsed);
  } catch (error) {
    return json(500, { error: error.message || "AI edit failed." });
  }
};
