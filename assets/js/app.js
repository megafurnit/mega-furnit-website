const LANGUAGES = ["en", "es", "zh"];
const DEFAULT_LANGUAGE = "en";
const WHATSAPP_NUMBER = "8613800000000";

let translations = {};
let cmsContent = {};
let pageBuilder = {};
let products = [];
let currentLanguage = localStorage.getItem("megaFurnitLang") || DEFAULT_LANGUAGE;

function normalizeLanguage(language) {
  return LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
}

function localized(value) {
  if (value && typeof value === "object") {
    return value[currentLanguage] || value[DEFAULT_LANGUAGE] || "";
  }
  return value || "";
}

function t(key) {
  return translations[currentLanguage]?.[key] || translations[DEFAULT_LANGUAGE]?.[key] || key;
}

function cmsText(key) {
  return cmsContent[currentLanguage]?.[key] || cmsContent[DEFAULT_LANGUAGE]?.[key] || "";
}

async function loadJson(path) {
  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(`${path}${separator}v=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load ${path}`);
  }
  return response.json();
}

async function loadOptionalJson(path) {
  try {
    return await loadJson(path);
  } catch (error) {
    console.warn(`${path} was not loaded. Using built-in defaults.`);
    return {};
  }
}

function normalizeProducts(productData) {
  if (Array.isArray(productData)) return productData;
  return productData.products || [];
}

function normalizePageBuilder(builderData) {
  return {
    ...builderData,
    theme: builderData.theme || {},
    pages: builderData.pages || {}
  };
}

function setDocumentLanguage() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : currentLanguage;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  document.querySelectorAll("[data-action='quote']").forEach((element) => {
    element.textContent = t("requestQuote");
  });

  document.querySelectorAll("[data-action='catalog']").forEach((element) => {
    element.textContent = t("downloadCatalog");
  });

  setDocumentLanguage();
}

function applyCmsContent() {
  document.querySelectorAll("[data-cms]").forEach((element) => {
    element.textContent = cmsText(element.dataset.cms);
  });
}

function applyThemeSettings() {
  const theme = pageBuilder.theme || {};
  const root = document.documentElement;
  const mappings = {
    primaryBackground: "--paper",
    secondaryBackground: "--field",
    textColor: "--ink",
    headingColor: "--heading-color",
    buttonBackground: "--forest",
    buttonTextColor: "--button-text-color",
    accentColor: "--brass",
    cardBackground: "--panel",
    borderColor: "--line",
    linkColor: "--link-color",
    headingFont: "--heading-font",
    bodyFont: "--body-font",
    baseFontSize: "--base-font-size",
    buttonRadius: "--button-radius",
    cardRadius: "--radius",
    sectionSpacing: "--section-spacing"
  };
  Object.entries(mappings).forEach(([key, variable]) => {
    if (theme[key]) root.style.setProperty(variable, theme[key]);
  });
}

function currentPageKey() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  if (path === "index.html" || path === "") return "home";
  if (path === "product-detail.html") return "product-detail";
  return path.replace(".html", "");
}

function sectionText(section, key) {
  return localized(section?.[key]);
}

function sectionStyle(section) {
  const styles = [];
  if (section.backgroundColor) styles.push(`background-color:${section.backgroundColor}`);
  if (section.textColor) styles.push(`color:${section.textColor}`);
  if (section.spacing) styles.push(`padding-top:${section.spacing};padding-bottom:${section.spacing}`);
  return styles.join(";");
}

function sectionButton(section) {
  const text = sectionText(section, "buttonText");
  const link = section.buttonLink || "#";
  return text ? `<div class="section-builder-actions"><a class="btn btn-primary" href="${link}">${text}</a></div>` : "";
}

function renderFeatureCards(section) {
  const cards = section.cards || [];
  return `<div class="section-builder-card-grid">${cards.map((card) => `
    <article class="section-builder-card">
      ${card.image ? `<img src="${card.image}" alt="${sectionText(card, "title")}">` : ""}
      <h3>${sectionText(card, "title")}</h3>
      <p>${sectionText(card, "body")}</p>
    </article>
  `).join("")}</div>`;
}

function renderGallery(section) {
  const images = section.images || [];
  return `<div class="section-builder-gallery">${images.map((item) => `
    <figure>
      <img src="${item.image || "assets/images/placeholder-furniture.svg"}" alt="${sectionText(item, "caption")}">
      ${sectionText(item, "caption") ? `<figcaption>${sectionText(item, "caption")}</figcaption>` : ""}
    </figure>
  `).join("")}</div>`;
}

function renderFaq(section) {
  const items = section.items || [];
  return `<div class="section-builder-faq">${items.map((item) => `
    <details>
      <summary>${sectionText(item, "question")}</summary>
      <p>${sectionText(item, "answer")}</p>
    </details>
  `).join("")}</div>`;
}

function renderLogoStrip(section) {
  const logos = section.logos || [];
  return `<div class="section-builder-logo-strip">${logos.map((logo) => `
    ${logo.image ? `<img src="${logo.image}" alt="${sectionText(logo, "alt")}">` : `<span>${sectionText(logo, "alt")}</span>`}
  `).join("")}</div>`;
}

function renderProductGridSection(section) {
  const selectedCategory = section.selectedCategory || "";
  const maxProducts = Number(section.maxProducts || 6);
  const selected = products
    .filter((product) => !selectedCategory || product.categoryKey === selectedCategory)
    .slice(0, maxProducts);
  return `<div class="product-grid">${selected.map(productCard).join("")}</div>`;
}

function renderSection(section) {
  if (!section || section.hidden) return "";
  const title = sectionText(section, "title") || sectionText(section, "heading");
  const body = sectionText(section, "body") || sectionText(section, "subtitle");
  const alignClass = section.alignment ? ` align-${section.alignment}` : "";
  const style = sectionStyle(section);
  const image = section.backgroundImage || section.image;

  if (section.type === "Hero Banner") {
    const heroStyle = `${style};${image ? `background-image:linear-gradient(90deg,rgba(21,21,21,.68),rgba(21,21,21,.22)),url('${image}');` : ""}${section.height ? `min-height:${section.height};` : ""}`;
    return `<section class="section-builder-section section-builder-hero${alignClass}" style="${heroStyle}">
      <div class="container"><h2>${title}</h2><p>${body}</p>${sectionButton(section)}</div>
    </section>`;
  }

  if (section.type === "Image Banner") {
    return `<section class="section-builder-section" style="${style}">
      <div class="container section-builder-split ${section.layout === "image-right" ? "image-right" : ""}">
        <div>${image ? `<img src="${image}" alt="${title}">` : ""}</div>
        <div><h2>${title}</h2><p>${body}</p>${sectionButton(section)}</div>
      </div>
    </section>`;
  }

  if (section.type === "Image Gallery") {
    return `<section class="section-builder-section" style="${style}"><div class="container"><h2>${title}</h2><p>${body}</p>${renderGallery(section)}</div></section>`;
  }

  if (section.type === "Video Block") {
    return `<section class="section-builder-section" style="${style}"><div class="container section-builder-video"><h2>${title}</h2><p>${body}</p>${section.videoPath ? `<video controls poster="${section.posterImage || ""}" src="${section.videoPath}"></video>` : ""}</div></section>`;
  }

  if (section.type === "CTA Banner") {
    return `<section class="section-builder-section section-builder-cta${alignClass}" style="${style}"><div class="container"><h2>${title}</h2><p>${body}</p>${sectionButton(section)}</div></section>`;
  }

  if (section.type === "Feature Cards") {
    return `<section class="section-builder-section" style="${style}"><div class="container"><h2>${title}</h2><p>${body}</p>${renderFeatureCards(section)}</div></section>`;
  }

  if (section.type === "Product Grid") {
    return `<section class="section-builder-section" style="${style}"><div class="container"><h2>${title}</h2>${renderProductGridSection(section)}</div></section>`;
  }

  if (section.type === "FAQ Section") {
    return `<section class="section-builder-section" style="${style}"><div class="container"><h2>${title}</h2>${renderFaq(section)}</div></section>`;
  }

  if (section.type === "Logo Strip") {
    return `<section class="section-builder-section" style="${style}"><div class="container"><h2>${title}</h2>${renderLogoStrip(section)}</div></section>`;
  }

  return `<section class="section-builder-section${alignClass}" style="${style}"><div class="container"><h2>${title}</h2><p>${body}</p>${section.customHtml || ""}${sectionButton(section)}</div></section>`;
}

function renderPageSections() {
  document.querySelector("[data-page-sections]")?.remove();
  const pageKey = currentPageKey();
  const sections = pageBuilder.pages?.[pageKey] || [];
  if (!sections.length) return;
  const wrapper = document.createElement("div");
  wrapper.dataset.pageSections = pageKey;
  wrapper.innerHTML = sections.map(renderSection).join("");
  document.querySelector("main")?.append(wrapper);
}

function setupLanguageSwitcher() {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLanguage);
    button.addEventListener("click", () => {
      currentLanguage = normalizeLanguage(button.dataset.lang);
      localStorage.setItem("megaFurnitLang", currentLanguage);
      applyTranslations();
      applyCmsContent();
      setupLanguageSwitcher();
      renderCurrentPage();
    });
  });
}

function setupMobileNavigation() {
  const toggle = document.querySelector("[data-mobile-toggle]");
  const header = document.querySelector(".site-header");
  if (!toggle || !header) return;
  toggle.addEventListener("click", () => header.classList.toggle("is-open"));
}

function inquiryHref(product) {
  const subject = product ? `${t("requestQuote")}: ${product.id} - ${localized(product.name)}` : t("requestQuote");
  return `contact.html?subject=${encodeURIComponent(subject)}`;
}

function whatsappHref(product) {
  const text = product
    ? `${t("requestQuote")}: ${product.id} - ${localized(product.name)}`
    : "Mega Furnit B2B inquiry";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function productCard(product) {
  return `
    <article class="product-card">
      <a href="product-detail.html?id=${encodeURIComponent(product.id)}" aria-label="${localized(product.name)}">
        <img src="${product.image}" alt="${localized(product.name)}">
      </a>
      <div class="product-body">
        <div>
          <div class="product-kicker">${product.id} · ${localized(product.category)}</div>
          <h3><a href="product-detail.html?id=${encodeURIComponent(product.id)}">${localized(product.name)}</a></h3>
        </div>
        <p>${localized(product.description)}</p>
        <div class="product-meta">
          <span class="pill">${t(product.factoryType)}</span>
          <span class="pill">${localized(product.style)}</span>
          <span class="pill">${product.moq}</span>
        </div>
        <div class="cta-row">
          <a class="btn btn-primary" href="${inquiryHref(product)}">${t("requestQuote")}</a>
          <a class="btn btn-secondary" href="product-detail.html?id=${encodeURIComponent(product.id)}">${t("details")}</a>
        </div>
      </div>
    </article>
  `;
}

function uniqueOptions(items, key, labelGetter) {
  const map = new Map();
  items.forEach((item) => {
    map.set(item[key], labelGetter(item));
  });
  return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]));
}

function fillSelect(select, options) {
  const value = select.value;
  select.innerHTML = `<option value="">${t("all")}</option>` + options
    .map(([optionValue, label]) => `<option value="${optionValue}">${label}</option>`)
    .join("");
  select.value = value;
}

function renderProductFilters() {
  const category = document.querySelector("#categoryFilter");
  const factory = document.querySelector("#factoryFilter");
  const style = document.querySelector("#styleFilter");
  if (!category || !factory || !style) return;

  fillSelect(category, uniqueOptions(products, "categoryKey", (item) => localized(item.category)));
  fillSelect(factory, uniqueOptions(products, "factoryType", (item) => t(item.factoryType)));
  fillSelect(style, uniqueOptions(products, "styleKey", (item) => localized(item.style)));

  [category, factory, style].forEach((select) => {
    select.onchange = renderProductList;
  });
}

function renderProductList() {
  const grid = document.querySelector("[data-product-grid]");
  if (!grid) return;

  const category = document.querySelector("#categoryFilter")?.value || "";
  const factory = document.querySelector("#factoryFilter")?.value || "";
  const style = document.querySelector("#styleFilter")?.value || "";

  const filtered = products.filter((product) => {
    return (!category || product.categoryKey === category)
      && (!factory || product.factoryType === factory)
      && (!style || product.styleKey === style);
  });

  grid.innerHTML = filtered.length
    ? filtered.map(productCard).join("")
    : `<div class="empty-state">${t("productNotFound")}</div>`;
}

function renderFeaturedProducts() {
  const grid = document.querySelector("[data-featured-products]");
  if (!grid) return;
  grid.innerHTML = products.slice(0, 6).map(productCard).join("");
}

function renderProductDetail() {
  const detail = document.querySelector("[data-product-detail]");
  if (!detail) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const product = products.find((item) => item.id === id);

  if (!product) {
    detail.innerHTML = `<div class="empty-state">${t("productNotFound")} <a href="products.html">${t("backToCatalog")}</a></div>`;
    return;
  }

  detail.innerHTML = `
    <div>
      <img class="detail-image" src="${product.image}" alt="${localized(product.name)}">
    </div>
    <aside class="detail-panel">
      <div class="product-id">${product.id} · ${localized(product.category)}</div>
      <h1>${localized(product.name)}</h1>
      <p class="lead">${localized(product.description)}</p>
      <dl class="spec-list">
        <div class="spec-row"><dt>${t("factoryType")}</dt><dd>${t(product.factoryType)}</dd></div>
        <div class="spec-row"><dt>${t("style")}</dt><dd>${localized(product.style)}</dd></div>
        <div class="spec-row"><dt>${t("dimensions")}</dt><dd>${product.dimensions}</dd></div>
        <div class="spec-row"><dt>${t("materials")}</dt><dd>${localized(product.materials)}</dd></div>
        <div class="spec-row"><dt>${t("moq")}</dt><dd>${product.moq}</dd></div>
        <div class="spec-row"><dt>${t("fob")}</dt><dd>${product.fob ? t("available") : "N/A"}</dd></div>
        <div class="spec-row"><dt>${t("loading")}</dt><dd>${product.loading40hq}</dd></div>
        <div class="spec-row"><dt>${t("customOptions")}</dt><dd>${localized(product.customOptions)}</dd></div>
      </dl>
      <div class="cta-row">
        <a class="btn btn-primary" href="${inquiryHref(product)}">${t("requestQuote")}</a>
        <a class="btn btn-secondary" target="_blank" rel="noopener" href="${whatsappHref(product)}">${t("whatsapp")}</a>
      </div>
    </aside>
  `;
}

function setupContactSubject() {
  const message = document.querySelector("#message");
  if (!message) return;
  const subject = new URLSearchParams(window.location.search).get("subject");
  if (subject && !message.value) {
    message.value = subject;
  }
}

function renderCurrentPage() {
  applyThemeSettings();
  renderFeaturedProducts();
  renderProductFilters();
  renderProductList();
  renderProductDetail();
  renderPageSections();
  setupContactSubject();
}

function applyPreviewState(previewState) {
  if (!previewState || previewState.type !== "mega-furnit-preview") return;
  if (previewState.language) {
    currentLanguage = normalizeLanguage(previewState.language);
  }
  if (previewState.cmsContent) {
    cmsContent = previewState.cmsContent;
  }
  if (previewState.productData) {
    products = normalizeProducts(previewState.productData);
  }
  if (previewState.pageBuilder) {
    pageBuilder = normalizePageBuilder(previewState.pageBuilder);
  }
  applyTranslations();
  applyCmsContent();
  applyThemeSettings();
  setupLanguageSwitcher();
  renderCurrentPage();
}

window.addEventListener("message", (event) => {
  applyPreviewState(event.data);
});

window.MegaFurnitPreview = {
  apply: applyPreviewState
};

async function init() {
  currentLanguage = normalizeLanguage(currentLanguage);
  try {
    const [translationData, productData, cmsData, builderData] = await Promise.all([
      loadJson("data/translations.json"),
      loadJson("data/products.json"),
      loadOptionalJson("data/site-content.json"),
      loadOptionalJson("data/page-builder.json")
    ]);
    translations = translationData;
    cmsContent = cmsData;
    pageBuilder = normalizePageBuilder(builderData);
    products = normalizeProducts(productData);
    applyTranslations();
    applyCmsContent();
    setupLanguageSwitcher();
    setupMobileNavigation();
    renderCurrentPage();
  } catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML("afterbegin", `<div class="empty-state">Site data could not be loaded.</div>`);
  }
}

document.addEventListener("DOMContentLoaded", init);
