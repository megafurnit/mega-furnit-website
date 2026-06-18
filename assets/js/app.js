const LANGUAGES = ["en", "es", "zh"];
const DEFAULT_LANGUAGE = "en";
const WHATSAPP_NUMBER = "8613800000000";

let translations = {};
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

async function loadJson(path) {
  const response = await fetch(path);
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

function mergeCmsContent(baseTranslations, cmsContent) {
  LANGUAGES.forEach((language) => {
    if (!cmsContent[language]) return;
    baseTranslations[language] = {
      ...baseTranslations[language],
      ...cmsContent[language]
    };
  });
  return baseTranslations;
}

function normalizeProducts(productData) {
  if (Array.isArray(productData)) return productData;
  return productData.products || [];
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

function setupLanguageSwitcher() {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLanguage);
    button.addEventListener("click", () => {
      currentLanguage = normalizeLanguage(button.dataset.lang);
      localStorage.setItem("megaFurnitLang", currentLanguage);
      applyTranslations();
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
  renderFeaturedProducts();
  renderProductFilters();
  renderProductList();
  renderProductDetail();
  setupContactSubject();
}

async function init() {
  currentLanguage = normalizeLanguage(currentLanguage);
  try {
    const [translationData, productData, cmsContent] = await Promise.all([
      loadJson("data/translations.json"),
      loadJson("data/products.json"),
      loadOptionalJson("data/site-content.json")
    ]);
    translations = mergeCmsContent(translationData, cmsContent);
    products = normalizeProducts(productData);
    applyTranslations();
    setupLanguageSwitcher();
    setupMobileNavigation();
    renderCurrentPage();
  } catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML("afterbegin", `<div class="empty-state">Site data could not be loaded.</div>`);
  }
}

document.addEventListener("DOMContentLoaded", init);
