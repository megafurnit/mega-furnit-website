const LANGUAGES = ["en", "es", "zh"];
const DEFAULT_LANGUAGE = "en";
const WHATSAPP_NUMBER = "8613800000000";

let translations = {};
let cmsContent = {};
let pageBuilder = {};
let products = [];
let currentLanguage = localStorage.getItem("megaFurnitLang") || DEFAULT_LANGUAGE;
let editorPreviewMode = false;
let selectedEditableId = "";
let inspectorEventsBound = false;

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
  return cmsContent[currentLanguage]?.[key]
    || cmsContent[DEFAULT_LANGUAGE]?.[key]
    || baseTranslation(key);
}

function cmsText(key) {
  return cmsContent[currentLanguage]?.[key] || cmsContent[DEFAULT_LANGUAGE]?.[key] || "";
}

function baseTranslation(key) {
  return translations[currentLanguage]?.[key] || translations[DEFAULT_LANGUAGE]?.[key] || key;
}

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function editableAttrs(type, id, path, extra = {}) {
  const attrs = {
    "data-editable-id": id,
    "data-editable-type": type,
    "data-editable-path": path,
    ...extra
  };
  return Object.entries(attrs)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}="${escapeAttr(value)}"`)
    .join(" ");
}

function productEditable(product, type, field) {
  return editableAttrs(type, `product-${product.id}-${field}`, `products.${product.id}.${field}`, {
    "data-editable-source": "products",
    "data-editable-product-id": product.id,
    "data-editable-field": field
  });
}

function i18nEditable(type, key) {
  return editableAttrs(type, `i18n-${key}`, `siteContent.${currentLanguage}.${key}`, {
    "data-editable-source": "siteContent",
    "data-editable-field": key
  });
}

function editableTypeForElement(element) {
  if (element.matches("img")) return "image";
  if (element.matches("a, button")) return "button";
  if (element.matches("h1, h2, h3, h4, h5, h6, summary, dt, label")) return "heading";
  return "text";
}

function assignEditable(element, type, id, path, extra = {}) {
  if (!element) return;
  const forceEditable = Boolean(extra.forceEditable);
  if (element.dataset.editableId && !forceEditable) return;
  element.dataset.editableId = id;
  element.dataset.editableType = type;
  element.dataset.editablePath = path || "";
  Object.entries(extra).forEach(([key, value]) => {
    if (key !== "forceEditable" && value !== undefined && value !== null && value !== "") {
      element.dataset[key] = value;
    }
  });
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
    pages: builderData.pages || {},
    elementStyles: builderData.elementStyles || {}
  };
}

function setDocumentLanguage() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : currentLanguage;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
    assignEditable(element, editableTypeForElement(element), `i18n-${key}`, `siteContent.${currentLanguage}.${key}`, {
      editableSource: "siteContent",
      editableField: key,
      forceEditable: true
    });
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  document.querySelectorAll("[data-action='quote']").forEach((element) => {
    element.textContent = t("requestQuote");
    assignEditable(element, "button", "i18n-requestQuote", `siteContent.${currentLanguage}.requestQuote`, {
      editableSource: "siteContent",
      editableField: "requestQuote",
      forceEditable: true
    });
  });

  document.querySelectorAll("[data-action='catalog']").forEach((element) => {
    element.textContent = t("downloadCatalog");
    assignEditable(element, "button", "i18n-downloadCatalog", `siteContent.${currentLanguage}.downloadCatalog`, {
      editableSource: "siteContent",
      editableField: "downloadCatalog",
      forceEditable: true
    });
  });

  setDocumentLanguage();
}

function applyCmsContent() {
  document.querySelectorAll("[data-cms]").forEach((element) => {
    const key = element.dataset.cms;
    element.textContent = cmsText(key);
    const type = editableTypeForElement(element);
    element.dataset.editableId = `site-${key}`;
    element.dataset.editableType = type;
    element.dataset.editablePath = `siteContent.${currentLanguage}.${key}`;
    element.dataset.editableSource = "siteContent";
    element.dataset.editableField = key;
  });
}

function applyStaticCmsContent() {
  document.querySelectorAll("[data-static-cms]").forEach((element) => {
    const key = element.dataset.staticCms;
    const value = cmsText(key);
    if (value) element.textContent = value;
    assignEditable(element, element.dataset.staticType || editableTypeForElement(element), `site-${key}`, `siteContent.${currentLanguage}.${key}`, {
      editableSource: "siteContent",
      editableField: key
    });
  });
}

function sharedTextValue(key, fallback) {
  return cmsText(key) || fallback;
}

function applySharedContentEditables() {
  document.querySelectorAll(".brand strong").forEach((element) => {
    element.textContent = sharedTextValue("brandName", "Mega Furnit");
    assignEditable(element, "heading", "site-brandName", `siteContent.${currentLanguage}.brandName`, {
      editableSource: "siteContent",
      editableField: "brandName",
      forceEditable: true
    });
  });

  document.querySelectorAll(".site-footer .footer-inner strong").forEach((element) => {
    element.textContent = sharedTextValue("footerBrandName", sharedTextValue("brandName", "Mega Furnit"));
    assignEditable(element, "heading", "site-footerBrandName", `siteContent.${currentLanguage}.footerBrandName`, {
      editableSource: "siteContent",
      editableField: "footerBrandName",
      forceEditable: true
    });
  });

  const languageLabels = {
    en: ["languageEnLabel", "EN"],
    es: ["languageEsLabel", "ES"],
    zh: ["languageZhLabel", "中文"]
  };
  document.querySelectorAll("[data-lang]").forEach((element) => {
    const [key, fallback] = languageLabels[element.dataset.lang] || [];
    if (!key) return;
    element.textContent = sharedTextValue(key, fallback);
    assignEditable(element, "button", `site-${key}`, `siteContent.${currentLanguage}.${key}`, {
      editableSource: "siteContent",
      editableField: key,
      forceEditable: true
    });
  });
}

function markStructuralEditables() {
  const page = currentPageKey();
  [
    [".hero", "banner"],
    [".page-hero", "banner"],
    [".metric-band", "section"],
    [".section", "section"],
    [".site-footer", "background"],
    [".filters", "background"],
    [".contact-form", "background"],
    ["form[name='inquiry']", "background"]
  ].forEach(([selector, type]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      assignEditable(element, type, `${page}-${type}-${index}`, "", { editablePage: page });
    });
  });

  [
    [".metric", "card"],
    [".capability-item", "card"],
    [".info-panel", "card"],
    [".contact-card", "card"],
    [".workflow li", "card"]
  ].forEach(([selector, type]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      assignEditable(element, type, `${page}-${selector.replace(/[^a-z0-9]+/gi, "-")}-${index}`, "", { editablePage: page });
    });
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

function cssValue(property, value) {
  if (property === "backgroundImage" && value) return `url("${value}")`;
  return value;
}

function applyElementStyles() {
  document.querySelectorAll("[data-editable-id]").forEach((element) => {
    element.classList.toggle("is-editor-selected", editorPreviewMode && element.dataset.editableId === selectedEditableId);
    const styles = pageBuilder.elementStyles?.[element.dataset.editableId];
    if (!styles) return;
    Object.entries(styles).forEach(([property, value]) => {
      if (!value || ["altText", "href", "hoverBackgroundColor"].includes(property)) return;
      element.style[property] = cssValue(property, value);
    });
    if (styles.altText && element.tagName === "IMG") element.alt = styles.altText;
    if (styles.href) {
      const link = element.tagName === "A" ? element : element.closest("a");
      if (link) link.href = styles.href;
    }
    if (styles.hoverBackgroundColor) element.style.setProperty("--editor-hover-bg", styles.hoverBackgroundColor);
  });
}

function editableTarget(event) {
  return event.target.closest("[data-editable-id]");
}

function elementLabel(element) {
  if (element.tagName === "IMG") return element.alt || element.src;
  return (element.textContent || element.getAttribute("aria-label") || "").trim().slice(0, 120);
}

function sendSelectedElement(element) {
  selectedEditableId = element.dataset.editableId;
  applyElementStyles();
  window.parent.postMessage({
    type: "mega-furnit-element-selected",
    element: {
      id: element.dataset.editableId,
      type: element.dataset.editableType || "background",
      path: element.dataset.editablePath || "",
      source: element.dataset.editableSource || "",
      field: element.dataset.editableField || "",
      page: element.dataset.editablePage || currentPageKey(),
      sectionIndex: element.dataset.editableSectionIndex,
      productId: element.dataset.editableProductId || "",
      tag: element.tagName.toLowerCase(),
      href: element.closest("a")?.getAttribute("href") || element.getAttribute("href") || "",
      label: elementLabel(element)
    }
  }, "*");
}

function setupEditableInspector() {
  document.body.classList.toggle("editor-preview-mode", editorPreviewMode);
  applyElementStyles();
  if (inspectorEventsBound) return;
  inspectorEventsBound = true;
  document.addEventListener("mouseover", (event) => {
    if (!editorPreviewMode) return;
    editableTarget(event)?.classList.add("is-editor-hovered");
  });
  document.addEventListener("mouseout", (event) => {
    editableTarget(event)?.classList.remove("is-editor-hovered");
  });
  document.addEventListener("click", (event) => {
    if (!editorPreviewMode) return;
    const interactive = event.target.closest("a, button");
    const target = editableTarget(event)
      || (interactive?.matches("[data-editable-id]") ? interactive : null)
      || interactive?.querySelector("[data-editable-id]");

    if (interactive || target) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }

    if (target) sendSelectedElement(target);
  }, true);
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

function sectionButton(section, index, pageKey) {
  const text = sectionText(section, "buttonText");
  const link = section.buttonLink || "#";
  const attrs = editableAttrs("button", `section-${section.id || index}-button`, `pageBuilder.pages.${pageKey}.${index}.buttonText`, {
    "data-editable-source": "pageBuilder",
    "data-editable-page": pageKey,
    "data-editable-section-index": index,
    "data-editable-field": "buttonText"
  });
  return text ? `<div class="section-builder-actions"><a class="btn btn-primary" href="${link}" ${attrs}>${text}</a></div>` : "";
}

function renderFeatureCards(section, index, pageKey) {
  const cards = section.cards || [];
  return `<div class="section-builder-card-grid">${cards.map((card, cardIndex) => `
    <article class="section-builder-card" ${editableAttrs("card", `section-${section.id || index}-card-${cardIndex}`, `pageBuilder.pages.${pageKey}.${index}.cards.${cardIndex}`, {
      "data-editable-source": "pageBuilder",
      "data-editable-page": pageKey,
      "data-editable-section-index": index
    })}>
      ${card.image ? `<img src="${card.image}" alt="${sectionText(card, "title")}" ${editableAttrs("image", `section-${section.id || index}-card-${cardIndex}-image`, `pageBuilder.pages.${pageKey}.${index}.cards.${cardIndex}.image`, {
        "data-editable-source": "pageBuilder",
        "data-editable-page": pageKey,
        "data-editable-section-index": index,
        "data-editable-field": "image"
      })}>` : ""}
      <h3 ${editableAttrs("heading", `section-${section.id || index}-card-${cardIndex}-title`, `pageBuilder.pages.${pageKey}.${index}.cards.${cardIndex}.title`, {
        "data-editable-source": "pageBuilder",
        "data-editable-page": pageKey,
        "data-editable-section-index": index,
        "data-editable-field": "title"
      })}>${sectionText(card, "title")}</h3>
      <p ${editableAttrs("text", `section-${section.id || index}-card-${cardIndex}-body`, `pageBuilder.pages.${pageKey}.${index}.cards.${cardIndex}.body`, {
        "data-editable-source": "pageBuilder",
        "data-editable-page": pageKey,
        "data-editable-section-index": index,
        "data-editable-field": "body"
      })}>${sectionText(card, "body")}</p>
    </article>
  `).join("")}</div>`;
}

function renderGallery(section, index, pageKey) {
  const images = section.images || [];
  return `<div class="section-builder-gallery">${images.map((item, imageIndex) => `
    <figure>
      <img src="${item.image || "assets/images/placeholder-furniture.svg"}" alt="${sectionText(item, "caption")}" ${editableAttrs("image", `section-${section.id || index}-gallery-${imageIndex}-image`, `pageBuilder.pages.${pageKey}.${index}.images.${imageIndex}.image`, {
        "data-editable-source": "pageBuilder",
        "data-editable-page": pageKey,
        "data-editable-section-index": index,
        "data-editable-field": "image"
      })}>
      ${sectionText(item, "caption") ? `<figcaption ${editableAttrs("text", `section-${section.id || index}-gallery-${imageIndex}-caption`, `pageBuilder.pages.${pageKey}.${index}.images.${imageIndex}.caption`, {
        "data-editable-source": "pageBuilder",
        "data-editable-page": pageKey,
        "data-editable-section-index": index,
        "data-editable-field": "caption"
      })}>${sectionText(item, "caption")}</figcaption>` : ""}
    </figure>
  `).join("")}</div>`;
}

function renderFaq(section, index, pageKey) {
  const items = section.items || [];
  return `<div class="section-builder-faq">${items.map((item, itemIndex) => `
    <details>
      <summary ${editableAttrs("heading", `section-${section.id || index}-faq-${itemIndex}-question`, `pageBuilder.pages.${pageKey}.${index}.items.${itemIndex}.question`, {
        "data-editable-source": "pageBuilder",
        "data-editable-page": pageKey,
        "data-editable-section-index": index,
        "data-editable-field": "question"
      })}>${sectionText(item, "question")}</summary>
      <p ${editableAttrs("text", `section-${section.id || index}-faq-${itemIndex}-answer`, `pageBuilder.pages.${pageKey}.${index}.items.${itemIndex}.answer`, {
        "data-editable-source": "pageBuilder",
        "data-editable-page": pageKey,
        "data-editable-section-index": index,
        "data-editable-field": "answer"
      })}>${sectionText(item, "answer")}</p>
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

function renderSection(section, index, pageKey) {
  if (!section || section.hidden) return "";
  const title = sectionText(section, "title") || sectionText(section, "heading");
  const body = sectionText(section, "body") || sectionText(section, "subtitle");
  const alignClass = section.alignment ? ` align-${section.alignment}` : "";
  const style = sectionStyle(section);
  const image = section.backgroundImage || section.image;
  const sectionId = section.id || `section-${index}`;
  const sectionAttrs = editableAttrs(section.type === "Hero Banner" ? "banner" : "section", `section-${sectionId}`, `pageBuilder.pages.${pageKey}.${index}`, {
    "data-editable-source": "pageBuilder",
    "data-editable-page": pageKey,
    "data-editable-section-index": index
  });
  const headingAttrs = editableAttrs("heading", `section-${sectionId}-heading`, `pageBuilder.pages.${pageKey}.${index}.title`, {
    "data-editable-source": "pageBuilder",
    "data-editable-page": pageKey,
    "data-editable-section-index": index,
    "data-editable-field": section.heading ? "heading" : "title"
  });
  const bodyAttrs = editableAttrs("text", `section-${sectionId}-body`, `pageBuilder.pages.${pageKey}.${index}.body`, {
    "data-editable-source": "pageBuilder",
    "data-editable-page": pageKey,
    "data-editable-section-index": index,
    "data-editable-field": section.subtitle ? "subtitle" : "body"
  });
  const imageAttrs = editableAttrs("image", `section-${sectionId}-image`, `pageBuilder.pages.${pageKey}.${index}.image`, {
    "data-editable-source": "pageBuilder",
    "data-editable-page": pageKey,
    "data-editable-section-index": index,
    "data-editable-field": section.backgroundImage ? "backgroundImage" : "image"
  });

  if (section.type === "Hero Banner") {
    const heroStyle = `${style};${image ? `background-image:linear-gradient(90deg,rgba(21,21,21,.68),rgba(21,21,21,.22)),url('${image}');` : ""}${section.height ? `min-height:${section.height};` : ""}`;
    return `<section class="section-builder-section section-builder-hero${alignClass}" style="${heroStyle}" ${sectionAttrs}>
      <div class="container"><h2 ${headingAttrs}>${title}</h2><p ${bodyAttrs}>${body}</p>${sectionButton(section, index, pageKey)}</div>
    </section>`;
  }

  if (section.type === "Image Banner") {
    return `<section class="section-builder-section" style="${style}" ${sectionAttrs}>
      <div class="container section-builder-split ${section.layout === "image-right" ? "image-right" : ""}">
        <div>${image ? `<img src="${image}" alt="${title}" ${imageAttrs}>` : ""}</div>
        <div><h2 ${headingAttrs}>${title}</h2><p ${bodyAttrs}>${body}</p>${sectionButton(section, index, pageKey)}</div>
      </div>
    </section>`;
  }

  if (section.type === "Image Gallery") {
    return `<section class="section-builder-section" style="${style}" ${sectionAttrs}><div class="container"><h2 ${headingAttrs}>${title}</h2><p ${bodyAttrs}>${body}</p>${renderGallery(section, index, pageKey)}</div></section>`;
  }

  if (section.type === "Video Block") {
    return `<section class="section-builder-section" style="${style}" ${sectionAttrs}><div class="container section-builder-video"><h2 ${headingAttrs}>${title}</h2><p ${bodyAttrs}>${body}</p>${section.videoPath ? `<video controls poster="${section.posterImage || ""}" src="${section.videoPath}"></video>` : ""}</div></section>`;
  }

  if (section.type === "CTA Banner") {
    return `<section class="section-builder-section section-builder-cta${alignClass}" style="${style}" ${sectionAttrs}><div class="container"><h2 ${headingAttrs}>${title}</h2><p ${bodyAttrs}>${body}</p>${sectionButton(section, index, pageKey)}</div></section>`;
  }

  if (section.type === "Feature Cards") {
    return `<section class="section-builder-section" style="${style}" ${sectionAttrs}><div class="container"><h2 ${headingAttrs}>${title}</h2><p ${bodyAttrs}>${body}</p>${renderFeatureCards(section, index, pageKey)}</div></section>`;
  }

  if (section.type === "Product Grid") {
    return `<section class="section-builder-section" style="${style}" ${sectionAttrs}><div class="container"><h2 ${headingAttrs}>${title}</h2>${renderProductGridSection(section)}</div></section>`;
  }

  if (section.type === "FAQ Section") {
    return `<section class="section-builder-section" style="${style}" ${sectionAttrs}><div class="container"><h2 ${headingAttrs}>${title}</h2>${renderFaq(section, index, pageKey)}</div></section>`;
  }

  if (section.type === "Logo Strip") {
    return `<section class="section-builder-section" style="${style}" ${sectionAttrs}><div class="container"><h2 ${headingAttrs}>${title}</h2>${renderLogoStrip(section)}</div></section>`;
  }

  return `<section class="section-builder-section${alignClass}" style="${style}" ${sectionAttrs}><div class="container"><h2 ${headingAttrs}>${title}</h2><p ${bodyAttrs}>${body}</p>${section.customHtml || ""}${sectionButton(section, index, pageKey)}</div></section>`;
}

function renderPageSections() {
  document.querySelector("[data-page-sections]")?.remove();
  const pageKey = currentPageKey();
  const sections = pageBuilder.pages?.[pageKey] || [];
  if (!sections.length) return;
  const wrapper = document.createElement("div");
  wrapper.dataset.pageSections = pageKey;
  wrapper.innerHTML = sections.map((section, index) => renderSection(section, index, pageKey)).join("");
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
      applyStaticCmsContent();
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
    <article class="product-card" ${productEditable(product, "product-card", "root")}>
      <a href="product-detail.html?id=${encodeURIComponent(product.id)}" aria-label="${localized(product.name)}">
        <img src="${product.image}" alt="${localized(product.name)}" ${productEditable(product, "image", "image")}>
      </a>
      <div class="product-body">
        <div>
          <div class="product-kicker" ${productEditable(product, "text", "category")}>${product.id} · ${localized(product.category)}</div>
          <h3><a href="product-detail.html?id=${encodeURIComponent(product.id)}" ${productEditable(product, "heading", "name")}>${localized(product.name)}</a></h3>
        </div>
        <p ${productEditable(product, "text", "description")}>${localized(product.description)}</p>
        <div class="product-meta">
          <span class="pill" ${productEditable(product, "text", "factoryType")}>${t(product.factoryType)}</span>
          <span class="pill" ${productEditable(product, "text", "style")}>${localized(product.style)}</span>
          <span class="pill" ${productEditable(product, "text", "moq")}>${product.moq}</span>
        </div>
        <div class="cta-row">
          <a class="btn btn-primary" href="${inquiryHref(product)}" ${i18nEditable("button", "requestQuote")}>${t("requestQuote")}</a>
          <a class="btn btn-secondary" href="product-detail.html?id=${encodeURIComponent(product.id)}" ${i18nEditable("button", "details")}>${t("details")}</a>
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
      <img class="detail-image" src="${product.image}" alt="${localized(product.name)}" ${productEditable(product, "image", "image")}>
    </div>
    <aside class="detail-panel">
      <div class="product-id" ${productEditable(product, "text", "category")}>${product.id} · ${localized(product.category)}</div>
      <h1 ${productEditable(product, "heading", "name")}>${localized(product.name)}</h1>
      <p class="lead" ${productEditable(product, "text", "description")}>${localized(product.description)}</p>
      <dl class="spec-list">
        <div class="spec-row"><dt ${i18nEditable("heading", "factoryType")}>${t("factoryType")}</dt><dd ${productEditable(product, "text", "factoryType")}>${t(product.factoryType)}</dd></div>
        <div class="spec-row"><dt ${i18nEditable("heading", "style")}>${t("style")}</dt><dd ${productEditable(product, "text", "style")}>${localized(product.style)}</dd></div>
        <div class="spec-row"><dt ${i18nEditable("heading", "dimensions")}>${t("dimensions")}</dt><dd ${productEditable(product, "text", "dimensions")}>${product.dimensions}</dd></div>
        <div class="spec-row"><dt ${i18nEditable("heading", "materials")}>${t("materials")}</dt><dd ${productEditable(product, "text", "materials")}>${localized(product.materials)}</dd></div>
        <div class="spec-row"><dt ${i18nEditable("heading", "moq")}>${t("moq")}</dt><dd ${productEditable(product, "text", "moq")}>${product.moq}</dd></div>
        <div class="spec-row"><dt ${i18nEditable("heading", "fob")}>${t("fob")}</dt><dd ${i18nEditable("text", product.fob ? "available" : "productNotFound")}>${product.fob ? t("available") : "N/A"}</dd></div>
        <div class="spec-row"><dt ${i18nEditable("heading", "loading")}>${t("loading")}</dt><dd ${productEditable(product, "text", "loading40hq")}>${product.loading40hq}</dd></div>
        <div class="spec-row"><dt ${i18nEditable("heading", "customOptions")}>${t("customOptions")}</dt><dd ${productEditable(product, "text", "customOptions")}>${localized(product.customOptions)}</dd></div>
      </dl>
      <div class="cta-row">
        <a class="btn btn-primary" href="${inquiryHref(product)}" ${i18nEditable("button", "requestQuote")}>${t("requestQuote")}</a>
        <a class="btn btn-secondary" target="_blank" rel="noopener" href="${whatsappHref(product)}" ${i18nEditable("button", "whatsapp")}>${t("whatsapp")}</a>
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
  applyStaticCmsContent();
  applySharedContentEditables();
  markStructuralEditables();
  setupEditableInspector();
}

function applyPreviewState(previewState) {
  if (!previewState || previewState.type !== "mega-furnit-preview") return;
  editorPreviewMode = Boolean(previewState.editorPreview);
  selectedEditableId = previewState.selectedEditableId || "";
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
  applyStaticCmsContent();
  applySharedContentEditables();
  applyThemeSettings();
  setupLanguageSwitcher();
  renderCurrentPage();
}

window.addEventListener("message", (event) => {
  if (event.data?.type === "mega-furnit-clear-selection") {
    selectedEditableId = "";
    applyElementStyles();
    return;
  }
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
    applyStaticCmsContent();
    applySharedContentEditables();
    setupLanguageSwitcher();
    setupMobileNavigation();
    renderCurrentPage();
  } catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML("afterbegin", `<div class="empty-state">Site data could not be loaded.</div>`);
  }
}

document.addEventListener("DOMContentLoaded", init);
