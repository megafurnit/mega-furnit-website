const LANGUAGES = ["en", "es", "zh"];
const PAGE_URLS = {
  home: "/index.html",
  about: "/about.html",
  capabilities: "/capabilities.html",
  contact: "/contact.html",
  products: "/products.html"
};

const PAGE_LABELS = {
  home: "Homepage",
  about: "About",
  capabilities: "Capabilities",
  contact: "Contact",
  products: "Products"
};

const SITE_FIELDS = {
  home: [
    ["heroTitle", "Hero title", "textarea"],
    ["heroText", "Hero subtitle", "textarea"],
    ["viewProducts", "View Products CTA text", "input"],
    ["supplyText", "Supply chain text", "textarea"]
  ],
  about: [
    ["aboutIntro", "About intro", "textarea"],
    ["aboutBody", "About body", "textarea"]
  ],
  capabilities: [
    ["capabilitiesIntro", "Capabilities intro", "textarea"],
    ["supplyText", "Supply text", "textarea"]
  ],
  contact: [
    ["contactIntro", "Contact intro", "textarea"],
    ["formNote", "Form note", "textarea"]
  ]
};

const CATEGORY_LABELS = {
  sofas: { en: "Sofas", es: "Sofás", zh: "沙发" },
  dining: { en: "Dining", es: "Comedor", zh: "餐厅家具" },
  bedroom: { en: "Bedroom", es: "Dormitorio", zh: "卧室家具" },
  storage: { en: "Storage", es: "Almacenamiento", zh: "储物家具" },
  living: { en: "Living Room", es: "Sala", zh: "客厅家具" },
  chairs: { en: "Chairs", es: "Sillas", zh: "椅类" }
};

let siteContent = {};
let productData = { products: [] };
let selectedPage = "home";
let selectedLanguage = "en";
let selectedProductIndex = 0;
let pendingUploads = new Map();
let aiDraft = null;

const pageSelector = document.querySelector("#pageSelector");
const languageSelector = document.querySelector("#languageSelector");
const contentEditor = document.querySelector("#contentEditor");
const preview = document.querySelector("#sitePreview");
const previewTitle = document.querySelector("#previewTitle");
const statusMessage = document.querySelector("#statusMessage");
const iframeWrap = document.querySelector("#iframeWrap");
const aiInstructions = document.querySelector("#aiInstructions");
const aiDraftPreview = document.querySelector("#aiDraftPreview");
const aiApplyButton = document.querySelector("#aiApplyButton");

async function loadJson(path) {
  const response = await fetch(`${path}?v=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return response.json();
}

function ensureLanguageObjects() {
  LANGUAGES.forEach((language) => {
    siteContent[language] = siteContent[language] || {};
  });
}

function localized(value) {
  if (value && typeof value === "object") {
    return value[selectedLanguage] || value.en || "";
  }
  return value || "";
}

function setLocalized(target, key, value) {
  target[key] = target[key] || {};
  target[key][selectedLanguage] = value;
}

function currentProduct() {
  return productData.products[selectedProductIndex];
}

function currentSiteFields() {
  return (SITE_FIELDS[selectedPage] || []).map(([key]) => key);
}

function currentSiteContentForPage() {
  const fields = currentSiteFields();
  const content = {};
  LANGUAGES.forEach((language) => {
    content[language] = {};
    fields.forEach((field) => {
      content[language][field] = siteContent[language]?.[field] || "";
    });
  });
  return content;
}

function pageUrl() {
  if (selectedPage === "products") return PAGE_URLS.products;
  return PAGE_URLS[selectedPage];
}

function sendPreviewUpdate() {
  if (!preview.contentWindow) return;
  preview.contentWindow.postMessage({
    type: "mega-furnit-preview",
    language: selectedLanguage,
    cmsContent: siteContent,
    productData
  }, "*");
}

function loadPreviewPage() {
  previewTitle.textContent = `${PAGE_LABELS[selectedPage]} preview`;
  preview.src = pageUrl();
}

function fieldControl(key, label, type) {
  const value = siteContent[selectedLanguage]?.[key] || "";
  const wrapper = document.createElement("div");
  wrapper.className = "field";
  const labelElement = document.createElement("label");
  labelElement.textContent = label;
  const input = document.createElement(type === "textarea" ? "textarea" : "input");
  input.value = value;
  input.addEventListener("input", () => {
    siteContent[selectedLanguage][key] = input.value;
    sendPreviewUpdate();
  });
  wrapper.append(labelElement, input);
  return wrapper;
}

function renderContentFields() {
  contentEditor.innerHTML = "";
  const title = document.createElement("h2");
  title.textContent = `${PAGE_LABELS[selectedPage]} content`;
  contentEditor.append(title);

  if (selectedPage === "products") {
    renderProductEditor();
    return;
  }

  SITE_FIELDS[selectedPage].forEach(([key, label, type]) => {
    contentEditor.append(fieldControl(key, label, type));
  });
}

function updateAiDraftPreview() {
  aiApplyButton.disabled = !aiDraft;
  aiDraftPreview.textContent = aiDraft ? JSON.stringify(aiDraft, null, 2) : "No AI draft yet.";
}

function productButton(product, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `product-row${index === selectedProductIndex ? " is-active" : ""}`;
  button.innerHTML = `<strong>${localized(product.name) || product.id}</strong><span>${product.id}</span>`;
  button.addEventListener("click", () => {
    selectedProductIndex = index;
    renderContentFields();
    sendPreviewUpdate();
  });
  return button;
}

function renderProductList(container) {
  const list = document.createElement("div");
  list.className = "product-list";
  productData.products.forEach((product, index) => {
    list.append(productButton(product, index));
  });
  container.append(list);
}

function productInput(label, value, onInput, type = "input") {
  const wrapper = document.createElement("div");
  wrapper.className = "field";
  const labelElement = document.createElement("label");
  labelElement.textContent = label;
  const input = document.createElement(type === "textarea" ? "textarea" : "input");
  input.value = value || "";
  input.addEventListener("input", () => {
    onInput(input.value);
    sendPreviewUpdate();
  });
  wrapper.append(labelElement, input);
  return wrapper;
}

function productSelect(label, value, onInput) {
  const wrapper = document.createElement("div");
  wrapper.className = "field";
  const labelElement = document.createElement("label");
  labelElement.textContent = label;
  const select = document.createElement("select");
  Object.keys(CATEGORY_LABELS).forEach((categoryKey) => {
    const option = document.createElement("option");
    option.value = categoryKey;
    option.textContent = CATEGORY_LABELS[categoryKey].en;
    select.append(option);
  });
  select.value = value || "sofas";
  select.addEventListener("change", () => {
    onInput(select.value);
    sendPreviewUpdate();
  });
  wrapper.append(labelElement, select);
  return wrapper;
}

function newProduct() {
  const nextNumber = String(productData.products.length + 1).padStart(3, "0");
  return {
    id: `MF-NEW${nextNumber}`,
    name: { en: "New Product", es: "Nuevo producto", zh: "新产品" },
    categoryKey: "sofas",
    category: { ...CATEGORY_LABELS.sofas },
    factoryType: "upholstered",
    styleKey: "modern",
    style: { en: "Modern", es: "Moderno", zh: "现代" },
    dimensions: "TBD",
    materials: { en: "TBD", es: "TBD", zh: "待定" },
    moq: "1 x 40HQ",
    fob: true,
    loading40hq: "TBD",
    customOptions: {
      en: "Fabric, finish, packaging, label program",
      es: "Tela, acabado, empaque, programa de etiqueta",
      zh: "面料、饰面、包装、贴牌方案"
    },
    description: { en: "New product description.", es: "Descripción del producto.", zh: "产品描述。" },
    image: "assets/images/placeholder-furniture.svg"
  };
}

function renderProductEditor() {
  const actions = document.createElement("div");
  actions.className = "button-row";
  const addButton = document.createElement("button");
  addButton.className = "secondary-button";
  addButton.type = "button";
  addButton.textContent = "Add product";
  addButton.addEventListener("click", () => {
    productData.products.push(newProduct());
    selectedProductIndex = productData.products.length - 1;
    renderContentFields();
    sendPreviewUpdate();
  });
  actions.append(addButton);
  contentEditor.append(actions);

  renderProductList(contentEditor);

  const product = currentProduct();
  if (!product) return;

  const detailTitle = document.createElement("h3");
  detailTitle.textContent = "Product details";
  contentEditor.append(detailTitle);

  contentEditor.append(productInput("Product ID", product.id, (value) => { product.id = value; }));
  contentEditor.append(productInput("Product name", localized(product.name), (value) => setLocalized(product, "name", value)));
  contentEditor.append(productSelect("Category", product.categoryKey, (value) => {
    product.categoryKey = value;
    product.category = product.category || {};
    product.category[selectedLanguage] = CATEGORY_LABELS[value][selectedLanguage] || CATEGORY_LABELS[value].en;
  }));
  contentEditor.append(productInput("Description", localized(product.description), (value) => setLocalized(product, "description", value), "textarea"));
  contentEditor.append(productInput("Dimensions", product.dimensions, (value) => { product.dimensions = value; }));
  contentEditor.append(productInput("Materials", localized(product.materials), (value) => setLocalized(product, "materials", value), "textarea"));
  contentEditor.append(productInput("Image path", product.image, (value) => { product.image = value; }));

  const upload = document.createElement("div");
  upload.className = "field";
  upload.innerHTML = `<label>Upload product image</label><input type="file" accept="image/*"><p class="help-text">For preview, this sets the path to assets/images/uploads/file-name. Publish the actual image through Decap CMS media upload or GitHub.</p>`;
  upload.querySelector("input").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const imagePath = `assets/images/uploads/${file.name}`;
    product.image = imagePath;
    pendingUploads.set(imagePath, file);
    renderContentFields();
    sendPreviewUpdate();
  });
  contentEditor.append(upload);

  const removeButton = document.createElement("button");
  removeButton.className = "danger-button";
  removeButton.type = "button";
  removeButton.textContent = "Remove product";
  removeButton.addEventListener("click", () => {
    if (!confirm("Remove this product from the draft catalog?")) return;
    productData.products.splice(selectedProductIndex, 1);
    selectedProductIndex = Math.max(0, selectedProductIndex - 1);
    renderContentFields();
    sendPreviewUpdate();
  });
  contentEditor.append(removeButton);
}

function mergeSiteDraft(draftSiteContent) {
  if (!draftSiteContent) return;
  LANGUAGES.forEach((language) => {
    if (!draftSiteContent[language]) return;
    siteContent[language] = siteContent[language] || {};
    Object.entries(draftSiteContent[language]).forEach(([key, value]) => {
      siteContent[language][key] = value;
    });
  });
}

function mergeProductDraft(draftProduct) {
  const product = currentProduct();
  if (!product || !draftProduct) return;
  ["name", "category", "description", "materials"].forEach((field) => {
    if (!draftProduct[field]) return;
    product[field] = product[field] || {};
    if (typeof draftProduct[field] === "object") {
      LANGUAGES.forEach((language) => {
        if (draftProduct[field][language]) {
          product[field][language] = draftProduct[field][language];
        }
      });
    }
  });
  ["categoryKey", "dimensions", "image"].forEach((field) => {
    if (draftProduct[field]) product[field] = draftProduct[field];
  });
}

async function requestAiDraft(action) {
  statusMessage.textContent = "Requesting AI draft...";
  aiDraft = null;
  updateAiDraftPreview();
  const payload = {
    action,
    language: selectedLanguage,
    page: selectedPage,
    instructions: aiInstructions.value,
    siteContent: currentSiteContentForPage(),
    product: selectedPage === "products" ? currentProduct() : null
  };
  try {
    const response = await fetch("/.netlify/functions/ai-edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "AI request failed.");
    }
    aiDraft = result.draft;
    updateAiDraftPreview();
    statusMessage.textContent = "AI draft ready. Review it, then apply it to update the editor preview.";
  } catch (error) {
    console.error(error);
    statusMessage.textContent = error.message;
    aiDraftPreview.textContent = `Error: ${error.message}`;
  }
}

function applyAiDraft() {
  if (!aiDraft) return;
  mergeSiteDraft(aiDraft.siteContent);
  mergeProductDraft(aiDraft.product);
  aiDraft = null;
  updateAiDraftPreview();
  renderContentFields();
  sendPreviewUpdate();
  statusMessage.textContent = "AI draft applied to the current editor draft. Use Save when you are ready to publish.";
}

function downloadFile(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function currentUserToken() {
  if (!window.netlifyIdentity) return null;
  const user = window.netlifyIdentity.currentUser();
  if (!user) return null;
  return user.jwt(true);
}

function toBase64Unicode(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function toBase64Bytes(bytes) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

async function saveGitGatewayFile(path, data, token) {
  const apiPath = `/.netlify/git/github/contents/${path}`;
  const current = await fetch(apiPath, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!current.ok) throw new Error(`Unable to read ${path} from Git Gateway.`);
  const currentJson = await current.json();
  const body = {
    message: `Update ${path} from visual editor`,
    content: toBase64Unicode(JSON.stringify(data, null, 2)),
    sha: currentJson.sha
  };
  const saved = await fetch(apiPath, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!saved.ok) throw new Error(`Unable to save ${path} through Git Gateway.`);
}

async function saveGitGatewayAsset(path, file, token) {
  const apiPath = `/.netlify/git/github/contents/${path}`;
  let sha;
  const current = await fetch(apiPath, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (current.ok) {
    const currentJson = await current.json();
    sha = currentJson.sha;
  }
  const body = {
    message: `Upload ${path} from visual editor`,
    content: toBase64Bytes(new Uint8Array(await file.arrayBuffer()))
  };
  if (sha) body.sha = sha;
  const saved = await fetch(apiPath, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!saved.ok) throw new Error(`Unable to upload ${path} through Git Gateway.`);
}

async function saveChanges() {
  statusMessage.textContent = "Saving...";
  try {
    const token = await currentUserToken();
    if (!token) throw new Error("Not logged in with Netlify Identity.");
    for (const [path, file] of pendingUploads.entries()) {
      await saveGitGatewayAsset(path, file, token);
    }
    await saveGitGatewayFile("data/site-content.json", siteContent, token);
    await saveGitGatewayFile("data/products.json", productData, token);
    statusMessage.textContent = "Saved to GitHub through Git Gateway. Netlify will redeploy from the commits.";
  } catch (error) {
    console.warn(error);
    localStorage.setItem("megaFurnitVisualEditorSiteContent", JSON.stringify(siteContent));
    localStorage.setItem("megaFurnitVisualEditorProducts", JSON.stringify(productData));
    downloadFile("site-content.json", siteContent);
    downloadFile("products.json", productData);
    statusMessage.textContent = "Direct Git Gateway save was not available. Draft saved in this browser and JSON files downloaded. Upload those JSON files through Decap CMS or GitHub.";
  }
}

function downloadChanges() {
  downloadFile("site-content.json", siteContent);
  downloadFile("products.json", productData);
  statusMessage.textContent = "Downloaded updated JSON files.";
}

async function init() {
  [siteContent, productData] = await Promise.all([
    loadJson("/data/site-content.json"),
    loadJson("/data/products.json")
  ]);
  ensureLanguageObjects();
  pageSelector.addEventListener("change", () => {
    selectedPage = pageSelector.value;
    renderContentFields();
    loadPreviewPage();
  });
  languageSelector.addEventListener("change", () => {
    selectedLanguage = languageSelector.value;
    renderContentFields();
    sendPreviewUpdate();
  });
  preview.addEventListener("load", sendPreviewUpdate);
  document.querySelector("#saveButton").addEventListener("click", saveChanges);
  document.querySelector("#downloadButton").addEventListener("click", downloadChanges);
  document.querySelector("#aiImproveButton").addEventListener("click", () => requestAiDraft("improve"));
  document.querySelector("#aiTranslateButton").addEventListener("click", () => requestAiDraft("translate"));
  document.querySelector("#aiProductDescriptionButton").addEventListener("click", () => requestAiDraft("product_description"));
  aiApplyButton.addEventListener("click", applyAiDraft);
  document.querySelector("#desktopPreview").addEventListener("click", () => iframeWrap.className = "iframe-wrap is-desktop");
  document.querySelector("#mobilePreview").addEventListener("click", () => iframeWrap.className = "iframe-wrap is-mobile");
  renderContentFields();
  loadPreviewPage();
}

init().catch((error) => {
  console.error(error);
  statusMessage.textContent = "The visual editor could not load the CMS JSON files.";
});
