const LANGUAGES = ["en", "es", "zh"];
const PAGE_URLS = {
  home: "/index.html",
  about: "/about.html",
  capabilities: "/capabilities.html",
  contact: "/contact.html",
  products: "/products.html",
  "product-detail": "/product-detail.html?id=MF-SF001",
  catalog: "/catalog.html"
};

const PAGE_LABELS = {
  home: "Homepage",
  about: "About",
  capabilities: "Capabilities",
  contact: "Contact",
  products: "Products",
  "product-detail": "Product Detail",
  catalog: "Catalog"
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

const THEME_DEFAULTS = {
  primaryBackground: "#F3EBDD",
  secondaryBackground: "#EFE6D8",
  textColor: "#151515",
  headingColor: "#1E1E1E",
  buttonBackground: "#151515",
  buttonTextColor: "#FFFFFF",
  accentColor: "#B08A5A",
  cardBackground: "#FFFFFF",
  borderColor: "#8C867D",
  linkColor: "#6B4423",
  headingFont: "Georgia",
  bodyFont: "Inter",
  baseFontSize: "16px",
  buttonRadius: "8px",
  cardRadius: "8px",
  sectionSpacing: "82px"
};

const THEME_FIELDS = [
  ["primaryBackground", "Primary background color", "color"],
  ["secondaryBackground", "Secondary background color", "color"],
  ["textColor", "Text color", "color"],
  ["headingColor", "Heading color", "color"],
  ["buttonBackground", "Button background color", "color"],
  ["buttonTextColor", "Button text color", "color"],
  ["accentColor", "Accent color", "color"],
  ["cardBackground", "Card background color", "color"],
  ["borderColor", "Border color", "color"],
  ["linkColor", "Link color", "color"],
  ["headingFont", "Heading font", "font"],
  ["bodyFont", "Body font", "font"],
  ["baseFontSize", "Base font size", "text"],
  ["buttonRadius", "Button radius", "text"],
  ["cardRadius", "Card radius", "text"],
  ["sectionSpacing", "Section spacing", "text"]
];

const FONTS = ["Inter", "Arial", "Georgia", "Times New Roman", "Helvetica", "Verdana", "system-ui", "serif", "sans-serif"];
const SWATCHES = ["#F3EBDD", "#EFE6D8", "#151515", "#1E1E1E", "#6B4423", "#7A5230", "#B08A5A", "#8C867D", "#FFFFFF"];
const SECTION_TYPES = ["Hero Banner", "Text Block", "Image Banner", "Image Gallery", "Video Block", "CTA Banner", "Feature Cards", "Product Grid", "FAQ Section", "Logo Strip", "Custom HTML/Text Block"];
const SECTION_PAGES = ["home", "products", "product-detail", "capabilities", "about", "contact", "catalog"];
const LAYER_TYPES = ["Text Box", "Button", "Rectangle", "Image", "Video", "Divider / Spacer"];
const HERO_BACKGROUND_DEFAULTS = {
  image: "assets/images/placeholder-furniture.svg",
  overlayColor: "#12201B",
  overlayOpacity: "0.86"
};
const SCHEMA_VERSION = "1.0.0";
const NATIVE_SECTIONS = {
  home: [
    { id: "home-native-0", label: "Hero Banner", type: "Original Section" },
    { id: "home-native-1", label: "Factory Metrics", type: "Original Section" },
    { id: "home-native-2", label: "Manufacturing Capability Intro", type: "Original Section" },
    { id: "home-native-3", label: "Featured Product Catalog", type: "Original Section" },
    { id: "home-native-4", label: "Inquiry CTA Banner", type: "Original Section" }
  ],
  products: [
    { id: "products-native-0", label: "Products Page Hero", type: "Original Section" },
    { id: "products-native-1", label: "Catalog Filters and Product Grid", type: "Original Section" }
  ],
  "product-detail": [
    { id: "product-detail-native-0", label: "Product Detail Hero", type: "Original Section" },
    { id: "product-detail-native-1", label: "Product Detail Content", type: "Original Section" }
  ],
  capabilities: [
    { id: "capabilities-native-0", label: "Capabilities Page Hero", type: "Original Section" },
    { id: "capabilities-native-1", label: "Factory Capabilities", type: "Original Section" },
    { id: "capabilities-native-2", label: "Supply Chain Workflow", type: "Original Section" }
  ],
  about: [
    { id: "about-native-0", label: "About Page Hero", type: "Original Section" },
    { id: "about-native-1", label: "About Company Content", type: "Original Section" }
  ],
  contact: [
    { id: "contact-native-0", label: "Contact Page Hero", type: "Original Section" },
    { id: "contact-native-1", label: "Contact Form and Details", type: "Original Section" }
  ],
  catalog: [
    { id: "catalog-native-0", label: "Catalog Page Hero", type: "Original Section" },
    { id: "catalog-native-1", label: "Catalog Download Placeholder", type: "Original Section" }
  ]
};

let siteContent = {};
let productData = { products: [] };
let pageBuilder = { theme: { ...THEME_DEFAULTS }, pages: {} };
let selectedPage = "home";
let selectedLanguage = "en";
let selectedProductIndex = 0;
let selectedSectionIndex = 0;
let selectedElement = null;
let previewInteractionMode = "edit";
let expandedSectionKey = "";
let expandedEditableId = "";
let pendingUploads = new Map();
let aiDraft = null;

const pageSelector = document.querySelector("#pageSelector");
const languageSelector = document.querySelector("#languageSelector");
const contentEditor = document.querySelector("#contentEditor");
const themeEditor = document.querySelector("#themeEditor");
const sectionsEditor = document.querySelector("#sectionsEditor");
const selectedElementEditor = document.querySelector("#selectedElementEditor");
const preview = document.querySelector("#sitePreview");
const previewTitle = document.querySelector("#previewTitle");
const statusMessage = document.querySelector("#statusMessage");
const iframeWrap = document.querySelector("#iframeWrap");
const aiInstructions = document.querySelector("#aiInstructions");
const aiDraftPreview = document.querySelector("#aiDraftPreview");
const aiApplyButton = document.querySelector("#aiApplyButton");
const editModePreview = document.querySelector("#editModePreview");
const navigateModePreview = document.querySelector("#navigateModePreview");

async function loadJson(path) {
  const response = await fetch(`${path}?v=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return response.json();
}

async function loadOptionalJson(path, fallback) {
  try {
    return await loadJson(path);
  } catch (error) {
    console.warn(`${path} was not loaded. Using fallback data.`);
    return fallback;
  }
}

function ensureLanguageObjects() {
  siteContent._schema = {
    schemaVersion: SCHEMA_VERSION,
    dataType: "site-content",
    lastUpdatedBy: siteContent._schema?.lastUpdatedBy || "Mega Furnit Visual Editor",
    ...(siteContent._schema || {})
  };
  LANGUAGES.forEach((language) => {
    siteContent[language] = siteContent[language] || {};
  });
}

function normalizeProductData(data) {
  const normalized = Array.isArray(data) ? { products: data } : { ...(data || {}) };
  normalized._schema = {
    schemaVersion: SCHEMA_VERSION,
    dataType: "products",
    lastUpdatedBy: normalized._schema?.lastUpdatedBy || "Mega Furnit Visual Editor",
    ...(normalized._schema || {})
  };
  normalized.products = Array.isArray(normalized.products) ? normalized.products : [];
  return normalized;
}

function ensurePageBuilder() {
  pageBuilder._schema = {
    schemaVersion: SCHEMA_VERSION,
    dataType: "page-builder",
    lastUpdatedBy: pageBuilder._schema?.lastUpdatedBy || "Mega Furnit Visual Editor",
    ...(pageBuilder._schema || {})
  };
  pageBuilder.theme = { ...THEME_DEFAULTS, ...(pageBuilder.theme || {}) };
  pageBuilder.pages = pageBuilder.pages || {};
  pageBuilder.elementStyles = pageBuilder.elementStyles || {};
  pageBuilder.layers = pageBuilder.layers || {};
  pageBuilder.nativeSections = pageBuilder.nativeSections || {};
  pageBuilder.sectionOrder = pageBuilder.sectionOrder || {};
  pageBuilder.layers.homeHero = pageBuilder.layers.homeHero || [];
  SECTION_PAGES.forEach((page) => {
    pageBuilder.pages[page] = pageBuilder.pages[page] || [];
    ensureSectionOrder(page);
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
    editorPreview: true,
    interactionMode: previewInteractionMode,
    selectedEditableId: selectedElement?.id || "",
    language: selectedLanguage,
    cmsContent: siteContent,
    productData,
    pageBuilder
  }, "*");
}

function loadPreviewPage() {
  previewTitle.textContent = `${PAGE_LABELS[selectedPage]} preview`;
  preview.src = pageUrl();
}

function setPreviewInteractionMode(mode) {
  previewInteractionMode = mode === "navigate" ? "navigate" : "edit";
  editModePreview?.classList.toggle("is-active", previewInteractionMode === "edit");
  navigateModePreview?.classList.toggle("is-active", previewInteractionMode === "navigate");
  statusMessage.textContent = previewInteractionMode === "navigate"
    ? "Navigate Mode: preview links open inside the iframe."
    : "Edit Mode: clicking editable preview elements selects them for editing.";
  sendPreviewUpdate();
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

function simpleInput(label, value, onInput, type = "text") {
  const wrapper = document.createElement("div");
  wrapper.className = "field";
  const labelElement = document.createElement("label");
  labelElement.textContent = label;
  const input = document.createElement(type === "textarea" ? "textarea" : "input");
  if (type !== "textarea") input.type = type;
  input.value = value || "";
  input.addEventListener("input", () => {
    onInput(input.value);
    sendPreviewUpdate();
  });
  wrapper.append(labelElement, input);
  return wrapper;
}

function selectInput(label, value, options, onInput) {
  const wrapper = document.createElement("div");
  wrapper.className = "field";
  const labelElement = document.createElement("label");
  labelElement.textContent = label;
  const select = document.createElement("select");
  options.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionValue;
    select.append(option);
  });
  select.value = value || options[0];
  select.addEventListener("change", () => {
    onInput(select.value);
    sendPreviewUpdate();
    renderThemeEditor();
    renderSectionsEditor();
  });
  wrapper.append(labelElement, select);
  return wrapper;
}

function colorInput(label, value, onInput, resetValue) {
  const wrapper = document.createElement("div");
  wrapper.className = "field";
  const labelElement = document.createElement("label");
  labelElement.textContent = label;
  const split = document.createElement("div");
  split.className = "split-field";
  const color = document.createElement("input");
  color.type = "color";
  color.value = value || resetValue;
  const hex = document.createElement("input");
  hex.value = value || resetValue;
  const update = (nextValue) => {
    color.value = nextValue;
    hex.value = nextValue;
    onInput(nextValue);
    sendPreviewUpdate();
  };
  color.addEventListener("input", () => update(color.value));
  hex.addEventListener("input", () => update(hex.value));
  split.append(color, hex);
  const swatches = document.createElement("div");
  swatches.className = "swatch-row";
  SWATCHES.forEach((swatchColor) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "swatch";
    button.style.backgroundColor = swatchColor;
    button.title = swatchColor;
    button.addEventListener("click", () => update(swatchColor));
    swatches.append(button);
  });
  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "secondary-button";
  reset.textContent = "Reset";
  reset.addEventListener("click", () => update(resetValue));
  wrapper.append(labelElement, split, swatches, reset);
  return wrapper;
}

function ensureElementStyles() {
  pageBuilder.elementStyles = pageBuilder.elementStyles || {};
  return pageBuilder.elementStyles;
}

function selectedStyle() {
  const layer = currentSelectedLayer();
  if (layer) {
    layer.styles = layer.styles || {};
    return layer.styles;
  }
  if (!selectedElement?.id) return {};
  const styles = ensureElementStyles();
  styles[selectedElement.id] = styles[selectedElement.id] || {};
  return styles[selectedElement.id];
}

function productById(productId) {
  return productData.products.find((product) => product.id === productId);
}

function resolveEditablePath(path) {
  if (!path) return null;
  const parts = path.split(".");
  if (parts[0] === "siteContent") {
    siteContent[parts[1]] = siteContent[parts[1]] || {};
    return { parent: siteContent[parts[1]], key: parts[2] };
  }
  if (parts[0] === "products") {
    const product = productById(parts[1]);
    return product ? { parent: product, key: parts[2] } : null;
  }
  if (parts[0] !== "pageBuilder") return null;
  let target = pageBuilder;
  for (let index = 1; index < parts.length - 1; index += 1) {
    const part = parts[index];
    target = Array.isArray(target) ? target[Number(part)] : target?.[part];
    if (target === undefined || target === null) return null;
  }
  return { parent: target, key: parts[parts.length - 1] };
}

function valueFromEditablePath(path) {
  const resolved = resolveEditablePath(path);
  if (!resolved?.parent || !resolved.key) return "";
  const value = resolved.parent[resolved.key];
  return typeof value === "object" ? localized(value) : (value || "");
}

function setValueAtEditablePath(path, value) {
  const resolved = resolveEditablePath(path);
  if (!resolved?.parent || !resolved.key) return false;
  const current = resolved.parent[resolved.key];
  if (current && typeof current === "object" && !Array.isArray(current)) {
    current[selectedLanguage] = value;
  } else {
    resolved.parent[resolved.key] = value;
  }
  return true;
}

function selectedSection() {
  if (selectedElement?.source !== "pageBuilder") return null;
  const page = selectedElement.page || selectedPage;
  const index = Number(selectedElement.sectionIndex);
  if (!Number.isInteger(index)) return null;
  return pageBuilder.pages?.[page]?.[index] || null;
}

function selectedElementValue() {
  if (!selectedElement) return "";
  const pathValue = valueFromEditablePath(selectedElement.path);
  if (pathValue) return pathValue;
  const field = selectedElement.field;
  if (selectedElement.source === "siteContent") {
    return siteContent[selectedLanguage]?.[field] || siteContent.en?.[field] || selectedElement.label || "";
  }
  if (selectedElement.source === "products") {
    const product = productById(selectedElement.productId);
    if (!product) return "";
    if (["name", "description", "materials", "category", "style", "customOptions"].includes(field)) {
      return localized(product[field]);
    }
    return product[field] || selectedElement.label || "";
  }
  if (selectedElement.source === "pageBuilderLayer") {
    const layer = currentSelectedLayer();
    if (!layer) return selectedElement.label || "";
    if (["Text Box", "Button"].includes(layer.type)) return localized(layer.text);
    if (layer.type === "Image") return layer.image || "";
    if (layer.type === "Video") return layer.videoPath || "";
    return layer.label || selectedElement.label || "";
  }
  if (selectedElement.source === "pageBuilder") {
    const section = selectedSection();
    if (!section) return "";
    if (["title", "heading", "body", "subtitle", "buttonText"].includes(field)) {
      return localized(section[field]);
    }
    return section[field] || "";
  }
  return selectedElement.label || "";
}

function updateSelectedElementValue(value, overrideField) {
  if (!selectedElement) return;
  if (!overrideField && setValueAtEditablePath(selectedElement.path, value)) return;
  const field = overrideField || selectedElement.field;
  if (selectedElement.source === "siteContent") {
    siteContent[selectedLanguage] = siteContent[selectedLanguage] || {};
    siteContent[selectedLanguage][field] = value;
  } else if (selectedElement.source === "products") {
    const product = productById(selectedElement.productId);
    if (!product) return;
    if (["name", "description", "materials", "category", "style", "customOptions"].includes(field)) {
      setLocalized(product, field, value);
    } else {
      product[field] = value;
    }
  } else if (selectedElement.source === "pageBuilderLayer") {
    const layer = currentSelectedLayer();
    if (!layer) return;
    if (["Text Box", "Button"].includes(layer.type)) {
      setLocalized(layer, "text", value);
    } else if (layer.type === "Image") {
      layer.image = value;
    } else if (layer.type === "Video") {
      layer.videoPath = value;
    } else {
      layer.label = value;
    }
  } else if (selectedElement.source === "pageBuilder") {
    const section = selectedSection();
    if (!section) return;
    if (["title", "heading", "body", "subtitle", "buttonText"].includes(field)) {
      localizeSection(section, field, value);
    } else {
      section[field] = value;
    }
  }
}

function selectedTextControl(label = "Text content") {
  return simpleInput(label, selectedElementValue(), (value) => {
    updateSelectedElementValue(value);
  }, selectedElement?.type === "button" || selectedElement?.type === "link" ? "text" : "textarea");
}

function selectedStyleInput(label, property, type = "text") {
  return simpleInput(label, selectedStyle()[property] || "", (value) => {
    if (value) selectedStyle()[property] = value;
    else delete selectedStyle()[property];
  }, type);
}

function selectedStyleColor(label, property, fallback = "#151515") {
  return colorInput(label, selectedStyle()[property] || fallback, (value) => {
    if (value) selectedStyle()[property] = value;
    else delete selectedStyle()[property];
  }, fallback);
}

function selectedStyleText(label, property, fallback = "") {
  return simpleInput(label, selectedStyle()[property] || fallback, (value) => {
    if (value) selectedStyle()[property] = value;
    else delete selectedStyle()[property];
  });
}

function selectedStyleSelect(label, property, options) {
  return selectInput(label, selectedStyle()[property] || options[0], options, (value) => {
    if (value) selectedStyle()[property] = value;
    else delete selectedStyle()[property];
  });
}

function selectedElementIsHomeHero() {
  return selectedElement?.page === "home" && selectedElement?.sectionKey === "native:home-native-0";
}

function checkboxControl(label, checked, onChange) {
  const wrapper = document.createElement("label");
  wrapper.className = "check-field";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = Boolean(checked);
  input.addEventListener("change", () => {
    onChange(input.checked);
    sendPreviewUpdate();
  });
  wrapper.append(input, document.createTextNode(label));
  return wrapper;
}

function moveSelectedSection(direction) {
  const page = selectedElement?.page || selectedPage;
  const order = ensureSectionOrder(page);
  let key = selectedElement?.sectionKey || "";
  if (!key && selectedElement?.sectionIndex !== undefined) {
    const section = pageBuilder.pages?.[page]?.[Number(selectedElement.sectionIndex)];
    key = section ? builderSectionKey(section) : "";
  }
  const index = order.indexOf(key);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= order.length) return;
  [order[index], order[nextIndex]] = [order[nextIndex], order[index]];
  selectedSectionIndex = nextIndex;
  selectedElement.sectionKey = key;
  renderSectionsEditor();
  renderSelectedElementEditor();
  sendPreviewUpdate();
}

function layerInput(label, key, type = "text") {
  const layer = currentSelectedLayer();
  return simpleInput(label, layer?.[key] || "", (value) => {
    if (layer) layer[key] = value;
  }, type);
}

function layerLocalizedInput(label, key, type = "textarea") {
  const layer = currentSelectedLayer();
  return simpleInput(label, localized(layer?.[key]), (value) => {
    if (layer) setLocalized(layer, key, value);
  }, type);
}

function updateLayerOrder(layer, direction) {
  const layers = pageBuilder.layers?.[selectedElement?.layerCollection] || [];
  const index = layers.findIndex((item) => item.id === layer.id);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= layers.length) return;
  [layers[index], layers[nextIndex]] = [layers[nextIndex], layers[index]];
  layers.forEach((item, orderIndex) => {
    item.zIndex = orderIndex + 1;
  });
  sendPreviewUpdate();
}

function duplicateSelectedLayer() {
  const layer = currentSelectedLayer();
  if (!layer) return;
  const layers = pageBuilder.layers?.[selectedElement.layerCollection] || [];
  const clone = JSON.parse(JSON.stringify(layer));
  clone.id = `layer-${Date.now()}`;
  clone.label = `${clone.label || clone.type} copy`;
  layers.push(clone);
  selectedElement = {
    ...selectedElement,
    id: `layer-${clone.id}`,
    layerId: clone.id,
    label: clone.label
  };
  renderSectionsEditor();
  renderSelectedElementEditor();
  sendPreviewUpdate();
}

function deleteSelectedLayer() {
  const layer = currentSelectedLayer();
  if (!layer) return;
  const layers = pageBuilder.layers?.[selectedElement.layerCollection] || [];
  const index = layers.findIndex((item) => item.id === layer.id);
  if (index >= 0) layers.splice(index, 1);
  selectedElement = null;
  renderSectionsEditor();
  renderSelectedElementEditor();
  sendPreviewUpdate();
}

function clearSelectedElement() {
  selectedElement = null;
  renderSelectedElementEditor();
  preview.contentWindow?.postMessage({ type: "mega-furnit-clear-selection" }, "*");
  sendPreviewUpdate();
}

function selectedElementControlsForType(type) {
  const controls = document.createElement("div");
  const add = (node) => controls.append(node);
  const normalized = type === "paragraph" ? "text" : type;

  if (normalized === "design-layer") {
    const layer = currentSelectedLayer();
    if (!layer) return controls;
    add(layerInput("Layer label", "label"));
    add(selectInput("Layer type", layer.type, LAYER_TYPES, (value) => { layer.type = value; }));
    add(layerInput("X position", "x"));
    add(layerInput("Y position", "y"));
    add(layerInput("Width", "width"));
    add(layerInput("Height", "height"));
    add(layerInput("Z-index / layer order", "zIndex", "number"));
    add(checkboxControl("Hide layer", layer.hidden, (checked) => { layer.hidden = checked; }));

    if (["Text Box", "Button"].includes(layer.type)) {
      add(layerLocalizedInput(layer.type === "Button" ? "Button text" : "Text content", "text"));
      add(selectedStyleSelect("Font family", "fontFamily", FONTS));
      add(selectedStyleInput("Font size", "fontSize"));
      add(checkboxControl("Bold", selectedStyle().fontWeight === "700" || selectedStyle().fontWeight === "800", (checked) => {
        selectedStyle().fontWeight = checked ? "700" : "";
      }));
      add(checkboxControl("Italic", selectedStyle().fontStyle === "italic", (checked) => {
        selectedStyle().fontStyle = checked ? "italic" : "";
      }));
      add(checkboxControl("Underline", selectedStyle().textDecoration === "underline", (checked) => {
        selectedStyle().textDecoration = checked ? "underline" : "";
      }));
      add(selectedStyleColor("Text color", "color", layer.type === "Button" ? "#FFFFFF" : "#151515"));
      add(selectedStyleSelect("Alignment", "textAlign", ["", "left", "center", "right"]));
      add(selectedStyleInput("Line height", "lineHeight"));
      add(selectedStyleInput("Letter spacing", "letterSpacing"));
      add(selectedStyleColor("Background color", "backgroundColor", layer.type === "Button" ? "#151515" : "#FFFFFF"));
      add(selectedStyleInput("Padding", "padding"));
      add(selectedStyleInput("Border radius", "borderRadius"));
      add(layerInput("Link URL", "link"));
      if (layer.type === "Button") add(selectedStyleColor("Hover background color", "hoverBackgroundColor", "#1E1E1E"));
    } else if (layer.type === "Image") {
      add(layerInput("Image path", "image"));
      add(layerLocalizedInput("Alt text", "alt", "input"));
      add(selectedStyleSelect("Object fit", "objectFit", ["", "cover", "contain", "fill"]));
      add(selectedStyleInput("Link URL", "href"));
    } else if (layer.type === "Video") {
      add(layerInput("Video path", "videoPath"));
      add(layerInput("Poster image path", "posterImage"));
      add(checkboxControl("Autoplay", layer.autoplay, (checked) => { layer.autoplay = checked; }));
      add(checkboxControl("Controls", layer.controls !== false, (checked) => { layer.controls = checked; }));
    }

    add(selectedStyleColor("Background color", "backgroundColor", "#B08A5A"));
    add(selectedStyleInput("Opacity", "opacity"));
    add(selectedStyleInput("Border radius", "borderRadius"));
    add(selectedStyleColor("Border color", "borderColor", "#8C867D"));
    add(selectedStyleInput("Shadow", "boxShadow"));

    const row = document.createElement("div");
    row.className = "button-row";
    [
      ["Bring forward", () => updateLayerOrder(layer, 1)],
      ["Send backward", () => updateLayerOrder(layer, -1)],
      ["Duplicate layer", duplicateSelectedLayer],
      ["Delete layer", deleteSelectedLayer]
    ].forEach(([label, handler]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = label === "Delete layer" ? "danger-button" : "secondary-button";
      button.textContent = label;
      button.addEventListener("click", handler);
      row.append(button);
    });
    add(row);
    return controls;
  }

  if (["heading", "text"].includes(normalized)) {
    add(selectedTextControl("Text content"));
    add(selectedStyleSelect("Font family", "fontFamily", FONTS));
    add(selectedStyleInput("Font size", "fontSize"));
    add(selectedStyleSelect("Font weight", "fontWeight", ["", "400", "500", "600", "700", "800"]));
    add(checkboxControl("Bold", selectedStyle().fontWeight === "700" || selectedStyle().fontWeight === "800", (checked) => {
      selectedStyle().fontWeight = checked ? "700" : "";
    }));
    add(checkboxControl("Italic", selectedStyle().fontStyle === "italic", (checked) => {
      selectedStyle().fontStyle = checked ? "italic" : "";
    }));
    add(checkboxControl("Underline", selectedStyle().textDecoration === "underline", (checked) => {
      selectedStyle().textDecoration = checked ? "underline" : "";
    }));
    add(selectedStyleColor("Text color", "color", "#151515"));
    add(selectedStyleSelect("Alignment", "textAlign", ["", "left", "center", "right"]));
    add(selectedStyleInput("Line height", "lineHeight"));
    add(selectedStyleInput("Letter spacing", "letterSpacing"));
    return controls;
  }

  if (["button", "link"].includes(normalized)) {
    add(selectedTextControl("Button text"));
    add(simpleInput("Link URL", selectedElement.source === "pageBuilder" ? selectedSection()?.buttonLink : selectedStyle().href || selectedElement.href || "", (value) => {
      if (selectedElement.source === "pageBuilder") updateSelectedElementValue(value, "buttonLink");
      selectedStyle().href = value;
    }));
    add(selectedStyleColor("Background color", "backgroundColor", "#151515"));
    add(selectedStyleColor("Text color", "color", "#FFFFFF"));
    add(selectedStyleInput("Font size", "fontSize"));
    add(selectedStyleInput("Border radius", "borderRadius"));
    add(selectedStyleInput("Padding", "padding"));
    add(selectedStyleColor("Border color", "borderColor", "#8C867D"));
    add(selectedStyleColor("Hover background color", "hoverBackgroundColor", "#1E1E1E"));
    return controls;
  }

  if (normalized === "image") {
    add(simpleInput("Image path", selectedElementValue(), (value) => {
      updateSelectedElementValue(value, selectedElement.field || "image");
    }));
    add(selectedStyleInput("Alt text", "altText"));
    add(selectedStyleInput("Width", "width"));
    add(selectedStyleInput("Height", "height"));
    add(selectedStyleInput("Border radius", "borderRadius"));
    add(selectedStyleSelect("Object fit", "objectFit", ["", "cover", "contain", "fill"]));
    add(selectedStyleInput("Link URL", "href"));
    return controls;
  }

  const heroSelected = selectedElementIsHomeHero();
  const backgroundImageValue = selectedSection()?.backgroundImage
    || selectedStyle().backgroundImage
    || (heroSelected ? HERO_BACKGROUND_DEFAULTS.image : "");
  add(selectedStyleColor("Background color", "backgroundColor", heroSelected ? "#12201B" : "#F3EBDD"));
  add(simpleInput("Background image path", backgroundImageValue, (value) => {
    const section = selectedSection();
    if (section) section.backgroundImage = value;
    selectedStyle().backgroundImage = value;
  }));
  add(selectedStyleColor("Overlay color", "overlayColor", HERO_BACKGROUND_DEFAULTS.overlayColor));
  add(selectedStyleText("Overlay opacity", "overlayOpacity", heroSelected ? HERO_BACKGROUND_DEFAULTS.overlayOpacity : ""));
  add(selectedStyleColor("Text color", "color", "#151515"));
  add(selectedStyleInput("Padding", "padding"));
  add(selectedStyleInput("Margin", "margin"));
  add(selectedStyleInput("Min height", "minHeight"));
  add(selectedStyleInput("Border radius", "borderRadius"));
  add(selectedStyleColor("Border color", "borderColor", "#8C867D"));
  add(selectedStyleInput("Shadow", "boxShadow"));

  const section = selectedSection();
  if (section) {
    add(checkboxControl("Hide section", section.hidden, (checked) => {
      section.hidden = checked;
      renderSectionsEditor();
    }));
    const row = document.createElement("div");
    row.className = "button-row";
    const up = document.createElement("button");
    up.type = "button";
    up.className = "secondary-button";
    up.textContent = "Move section up";
    up.addEventListener("click", () => moveSelectedSection(-1));
    const down = document.createElement("button");
    down.type = "button";
    down.className = "secondary-button";
    down.textContent = "Move section down";
    down.addEventListener("click", () => moveSelectedSection(1));
    row.append(up, down);
    add(row);
  }
  return controls;
}

function renderSelectedElementEditor() {
  selectedElementEditor.innerHTML = "";
  selectedElementEditor.append(Object.assign(document.createElement("h2"), { textContent: "Selected Element" }));
  if (!selectedElement) {
    const note = document.createElement("p");
    note.className = "help-text";
    note.textContent = "Click an element in the preview to edit it.";
    selectedElementEditor.append(note);
    return;
  }

  const meta = document.createElement("div");
  meta.className = "selected-meta";
  meta.innerHTML = `<strong>${selectedElement.type}</strong><span>ID: ${selectedElement.id}</span>`;
  const clear = document.createElement("button");
  clear.type = "button";
  clear.className = "secondary-button";
  clear.textContent = "Clear selection";
  clear.addEventListener("click", clearSelectedElement);
  selectedElementEditor.append(meta, clear, selectedElementControlsForType(selectedElement.type));
}

function renderThemeEditor() {
  themeEditor.innerHTML = "";
  themeEditor.append(Object.assign(document.createElement("h2"), { textContent: "Theme Settings" }));
  THEME_FIELDS.forEach(([key, label, type]) => {
    if (type === "color") {
      themeEditor.append(colorInput(label, pageBuilder.theme[key], (value) => { pageBuilder.theme[key] = value; }, THEME_DEFAULTS[key]));
    } else if (type === "font") {
      themeEditor.append(selectInput(label, pageBuilder.theme[key], FONTS, (value) => { pageBuilder.theme[key] = value; }));
    } else {
      themeEditor.append(simpleInput(label, pageBuilder.theme[key], (value) => { pageBuilder.theme[key] = value; }));
    }
  });
}

function localizeSection(section, key, value) {
  section[key] = section[key] || {};
  section[key][selectedLanguage] = value;
}

function sectionLabel(section, index) {
  return localized(section.title) || localized(section.heading) || `${section.type} ${index + 1}`;
}

function currentSections() {
  pageBuilder.pages[selectedPage] = pageBuilder.pages[selectedPage] || [];
  return pageBuilder.pages[selectedPage];
}

function nativeSectionKey(id) {
  return `native:${id}`;
}

function builderSectionKey(section) {
  return `builder:${section.id}`;
}

function sectionKeyItem(key, page = selectedPage) {
  if (key.startsWith("native:")) {
    const id = key.replace("native:", "");
    const definition = (NATIVE_SECTIONS[page] || []).find((item) => item.id === id);
    const state = pageBuilder.nativeSections?.[page]?.[id] || {};
    if (!definition || state.deleted) return null;
    return { key, kind: "native", id, definition, state };
  }
  if (key.startsWith("builder:")) {
    const id = key.replace("builder:", "");
    const section = (pageBuilder.pages?.[page] || []).find((item) => item.id === id);
    if (!section) return null;
    return { key, kind: "builder", id, section };
  }
  return null;
}

function ensureSectionOrder(page = selectedPage) {
  pageBuilder.pages = pageBuilder.pages || {};
  pageBuilder.nativeSections = pageBuilder.nativeSections || {};
  pageBuilder.sectionOrder = pageBuilder.sectionOrder || {};
  pageBuilder.pages[page] = pageBuilder.pages[page] || [];
  pageBuilder.nativeSections[page] = pageBuilder.nativeSections[page] || {};

  (NATIVE_SECTIONS[page] || []).forEach((definition) => {
    const existing = pageBuilder.nativeSections[page][definition.id] || {};
    pageBuilder.nativeSections[page][definition.id] = {
      label: definition.label,
      type: definition.type,
      ...existing
    };
  });

  const nativeKeys = (NATIVE_SECTIONS[page] || [])
    .filter((definition) => !pageBuilder.nativeSections[page][definition.id]?.deleted)
    .map((definition) => nativeSectionKey(definition.id));
  const builderKeys = pageBuilder.pages[page].map(builderSectionKey);
  const validKeys = new Set([...nativeKeys, ...builderKeys]);
  const currentOrder = Array.isArray(pageBuilder.sectionOrder[page]) ? pageBuilder.sectionOrder[page] : [];
  const nextOrder = currentOrder.filter((key) => validKeys.has(key));
  [...nativeKeys, ...builderKeys].forEach((key) => {
    if (!nextOrder.includes(key)) nextOrder.push(key);
  });
  pageBuilder.sectionOrder[page] = nextOrder;
  return nextOrder;
}

function currentSectionItems(page = selectedPage) {
  return ensureSectionOrder(page)
    .map((key) => sectionKeyItem(key, page))
    .filter(Boolean);
}

function currentSectionItem() {
  const items = currentSectionItems();
  if (selectedSectionIndex >= items.length) selectedSectionIndex = Math.max(0, items.length - 1);
  return items[selectedSectionIndex] || null;
}

function currentSection() {
  const item = currentSectionItem();
  return item?.kind === "builder" ? item.section : null;
}

function defaultHomeHeroLayers() {
  return [];
}

function currentLayerCollectionId() {
  const item = currentSectionItem();
  if (selectedPage === "home" && item?.id === "home-native-0") return "homeHero";
  if (item?.kind === "builder") return `${selectedPage}:${item.section.id}`;
  if (item?.kind === "native") return `${selectedPage}:${item.id}`;
  return selectedPage;
}

function currentLayers() {
  pageBuilder.layers = pageBuilder.layers || {};
  const collectionId = currentLayerCollectionId();
  pageBuilder.layers[collectionId] = pageBuilder.layers[collectionId] || [];
  return pageBuilder.layers[collectionId];
}

function layerById(layerId, collectionId = selectedElement?.layerCollection || currentLayerCollectionId()) {
  return (pageBuilder.layers?.[collectionId] || []).find((layer) => layer.id === layerId);
}

function currentSelectedLayer() {
  if (selectedElement?.source !== "pageBuilderLayer") return null;
  return layerById(selectedElement.layerId, selectedElement.layerCollection);
}

function defaultLayer(type = "Text Box") {
  const id = `layer-${Date.now()}`;
  const base = {
    id,
    type,
    label: type,
    x: "12%",
    y: "16%",
    width: type === "Divider / Spacer" ? "52%" : "260px",
    height: type === "Divider / Spacer" ? "2px" : "auto",
    zIndex: 5,
    hidden: false,
    styles: {
      backgroundColor: type === "Rectangle" || type === "Divider / Spacer" ? "#B08A5A" : "",
      color: "#151515",
      opacity: "1",
      borderRadius: type === "Button" ? "8px" : "0",
      borderColor: "",
      boxShadow: ""
    }
  };
  if (type === "Text Box") return { ...base, text: { en: "New text layer", es: "Nueva capa de texto", zh: "新文本层" }, styles: { ...base.styles, backgroundColor: "transparent", padding: "0", fontSize: "22px" } };
  if (type === "Button") return { ...base, text: { en: "Request Quote", es: "Solicitar cotización", zh: "询价" }, link: "contact.html", styles: { ...base.styles, backgroundColor: "#151515", color: "#FFFFFF", padding: "12px 18px" } };
  if (type === "Image") return { ...base, image: "assets/images/placeholder-furniture.svg", alt: { en: "Furniture image", es: "Imagen de mueble", zh: "家具图片" }, styles: { ...base.styles, objectFit: "cover", borderRadius: "8px" } };
  if (type === "Video") return { ...base, videoPath: "", posterImage: "assets/images/placeholder-furniture.svg", controls: true, autoplay: false, styles: { ...base.styles, borderRadius: "8px" } };
  return base;
}

function defaultSection(type = "Text Block") {
  const base = {
    id: `section-${Date.now()}`,
    type,
    hidden: false,
    title: { en: type, es: type, zh: type },
    body: { en: "Add section text here.", es: "Agregue texto de sección aquí.", zh: "在这里添加板块文字。" },
    backgroundColor: "#F3EBDD",
    textColor: "#151515",
    spacing: "72px"
  };
  if (type === "Hero Banner") return { ...base, subtitle: base.body, backgroundImage: "assets/images/placeholder-furniture.svg", buttonText: { en: "Request Quote", es: "Solicitar cotización", zh: "询价" }, buttonLink: "contact.html", alignment: "left", height: "560px" };
  if (type === "Image Banner") return { ...base, image: "assets/images/placeholder-furniture.svg", heading: base.title, buttonText: { en: "View Products", es: "Ver productos", zh: "查看产品" }, buttonLink: "products.html", layout: "image-left" };
  if (type === "Image Gallery") return { ...base, images: [{ image: "assets/images/placeholder-furniture.svg", caption: { en: "Factory program", es: "Programa de fábrica", zh: "工厂项目" } }] };
  if (type === "Video Block") return { ...base, videoPath: "", posterImage: "assets/images/placeholder-furniture.svg", heading: base.title };
  if (type === "CTA Banner") return { ...base, heading: base.title, buttonText: { en: "Contact Us", es: "Contáctenos", zh: "联系我们" }, buttonLink: "contact.html" };
  if (type === "Feature Cards") return { ...base, cards: [{ title: { en: "Factory Capacity", es: "Capacidad de fábrica", zh: "工厂产能" }, body: { en: "Add feature details.", es: "Agregue detalles.", zh: "添加特点说明。" }, image: "" }] };
  if (type === "Product Grid") return { ...base, heading: base.title, selectedCategory: "", maxProducts: 6 };
  if (type === "FAQ Section") return { ...base, items: [{ question: { en: "What is the MOQ?", es: "¿Cuál es el MOQ?", zh: "起订量是多少？" }, answer: { en: "MOQ depends on the product and program.", es: "El MOQ depende del producto y programa.", zh: "起订量取决于产品和项目。" } }] };
  if (type === "Logo Strip") return { ...base, logos: [{ image: "", alt: { en: "Partner", es: "Socio", zh: "合作伙伴" } }] };
  if (type === "Custom HTML/Text Block") return { ...base, customHtml: "<p>Custom HTML/text content.</p>" };
  return base;
}

function sectionInput(section, key, label, type = "input") {
  const value = localized(section[key]);
  return simpleInput(label, value, (nextValue) => localizeSection(section, key, nextValue), type === "textarea" ? "textarea" : "text");
}

function sectionPlainInput(section, key, label, type = "text") {
  return simpleInput(label, section[key], (nextValue) => { section[key] = nextValue; }, type);
}

function sectionColorInput(section, key, label, fallback) {
  return colorInput(label, section[key] || fallback, (nextValue) => { section[key] = nextValue; }, fallback);
}

function renderRepeater(section, key, fields, defaultItem) {
  const wrapper = document.createElement("div");
  wrapper.className = "nested-editor";
  wrapper.append(Object.assign(document.createElement("h3"), { textContent: key }));
  section[key] = section[key] || [];
  section[key].forEach((item, index) => {
    const itemBox = document.createElement("div");
    itemBox.className = "nested-editor";
    fields.forEach(([fieldKey, label, mode]) => {
      if (mode === "localized") {
        itemBox.append(simpleInput(label, localized(item[fieldKey]), (value) => {
          item[fieldKey] = item[fieldKey] || {};
          item[fieldKey][selectedLanguage] = value;
        }, "textarea"));
      } else {
        itemBox.append(simpleInput(label, item[fieldKey], (value) => { item[fieldKey] = value; }));
      }
    });
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "danger-button";
    remove.textContent = "Remove item";
    remove.addEventListener("click", () => {
      section[key].splice(index, 1);
      renderSectionsEditor();
      sendPreviewUpdate();
    });
    itemBox.append(remove);
    wrapper.append(itemBox);
  });
  const add = document.createElement("button");
  add.type = "button";
  add.className = "secondary-button";
  add.textContent = `Add ${key} item`;
  add.addEventListener("click", () => {
    section[key].push(JSON.parse(JSON.stringify(defaultItem)));
    renderSectionsEditor();
    sendPreviewUpdate();
  });
  wrapper.append(add);
  return wrapper;
}

function renderSectionFields(section) {
  const fields = document.createElement("div");
  fields.className = "nested-editor";
  fields.append(selectInput("Section type", section.type, SECTION_TYPES, (value) => {
    const next = defaultSection(value);
    Object.assign(section, { ...next, id: section.id, hidden: section.hidden });
  }));
  fields.append(sectionInput(section, "title", "Section title", "textarea"));
  fields.append(sectionInput(section, "body", "Section body text", "textarea"));
  fields.append(sectionColorInput(section, "backgroundColor", "Section background color", "#F3EBDD"));
  fields.append(sectionColorInput(section, "textColor", "Section text color", "#151515"));
  fields.append(sectionInput(section, "buttonText", "Button text"));
  fields.append(sectionPlainInput(section, "buttonLink", "Button link"));
  fields.append(sectionPlainInput(section, "image", "Image path"));
  fields.append(sectionPlainInput(section, "backgroundImage", "Background image path"));
  fields.append(sectionPlainInput(section, "videoPath", "Video path"));
  fields.append(sectionPlainInput(section, "posterImage", "Poster image path"));
  fields.append(sectionPlainInput(section, "spacing", "Section spacing / padding"));
  fields.append(selectInput("Alignment", section.alignment || "left", ["left", "center", "right"], (value) => { section.alignment = value; }));
  fields.append(selectInput("Layout", section.layout || "image-left", ["image-left", "image-right"], (value) => { section.layout = value; }));
  fields.append(sectionPlainInput(section, "height", "Height"));
  fields.append(sectionPlainInput(section, "selectedCategory", "Selected category"));
  fields.append(sectionPlainInput(section, "maxProducts", "Max products", "number"));
  fields.append(simpleInput("Custom HTML/Text", section.customHtml, (value) => { section.customHtml = value; }, "textarea"));
  if (section.type === "Image Gallery") fields.append(renderRepeater(section, "images", [["image", "Image path", "plain"], ["caption", "Caption", "localized"]], { image: "assets/images/placeholder-furniture.svg", caption: { en: "Caption", es: "Subtítulo", zh: "说明" } }));
  if (section.type === "Feature Cards") fields.append(renderRepeater(section, "cards", [["image", "Image path", "plain"], ["title", "Card title", "localized"], ["body", "Card body", "localized"]], { image: "", title: { en: "Feature", es: "Característica", zh: "特点" }, body: { en: "Feature text", es: "Texto", zh: "文字" } }));
  if (section.type === "FAQ Section") fields.append(renderRepeater(section, "items", [["question", "Question", "localized"], ["answer", "Answer", "localized"]], { question: { en: "Question", es: "Pregunta", zh: "问题" }, answer: { en: "Answer", es: "Respuesta", zh: "答案" } }));
  if (section.type === "Logo Strip") fields.append(renderRepeater(section, "logos", [["image", "Logo image path", "plain"], ["alt", "Logo label", "localized"]], { image: "", alt: { en: "Logo", es: "Logo", zh: "标志" } }));
  return fields;
}

function selectLayer(layer, collectionId = currentLayerCollectionId()) {
  selectedElement = {
    id: `layer-${layer.id}`,
    type: "design-layer",
    source: "pageBuilderLayer",
    layerId: layer.id,
    layerCollection: collectionId,
    page: selectedPage,
    label: layer.label || layer.type
  };
  renderSelectedElementEditor();
  sendPreviewUpdate();
}

function renderLayerManager() {
  const wrapper = document.createElement("div");
  wrapper.className = "nested-editor layer-manager";
  const collectionId = currentLayerCollectionId();
  const layers = currentLayers();
  wrapper.append(Object.assign(document.createElement("h3"), { textContent: selectedPage === "home" ? "Homepage Hero Layers" : "Section Layers" }));

  const addRow = document.createElement("div");
  addRow.className = "button-row";
  const typeSelect = document.createElement("select");
  LAYER_TYPES.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeSelect.append(option);
  });
  const add = document.createElement("button");
  add.type = "button";
  add.className = "secondary-button";
  add.textContent = "Add layer";
  add.addEventListener("click", () => {
    const layer = defaultLayer(typeSelect.value);
    layers.push(layer);
    selectLayer(layer, collectionId);
    renderSectionsEditor();
    sendPreviewUpdate();
  });
  addRow.append(typeSelect, add);
  wrapper.append(addRow);

  if (!layers.length) {
    const note = document.createElement("p");
    note.className = "help-text";
    note.textContent = "No design layers yet. Add a layer above.";
    wrapper.append(note);
    return wrapper;
  }

  const list = document.createElement("div");
  list.className = "layer-list";
  layers
    .slice()
    .sort((a, b) => Number(a.zIndex || 0) - Number(b.zIndex || 0))
    .forEach((layer) => {
      const row = document.createElement("div");
      row.className = `layer-row${selectedElement?.layerId === layer.id ? " is-active" : ""}`;
      const select = document.createElement("button");
      select.type = "button";
      select.className = "layer-select";
      select.innerHTML = `<strong>${layer.label || layer.type}</strong><span>${layer.type}${layer.hidden ? " · Hidden" : ""}</span>`;
      select.addEventListener("click", () => selectLayer(layer, collectionId));

      const actions = document.createElement("div");
      actions.className = "mini-actions";
      [
        [layer.hidden ? "Show" : "Hide", () => { layer.hidden = !layer.hidden; }],
        ["Copy", () => {
          const clone = JSON.parse(JSON.stringify(layer));
          clone.id = `layer-${Date.now()}`;
          clone.label = `${clone.label || clone.type} copy`;
          layers.push(clone);
        }],
        ["Up", () => { layer.zIndex = Number(layer.zIndex || 0) + 1; }],
        ["Down", () => { layer.zIndex = Number(layer.zIndex || 0) - 1; }],
        ["Delete", () => {
          const index = layers.findIndex((item) => item.id === layer.id);
          if (index >= 0) layers.splice(index, 1);
        }]
      ].forEach(([label, handler]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = label === "Delete" ? "danger-button tiny-button" : "secondary-button tiny-button";
        button.textContent = label;
        button.addEventListener("click", () => {
          handler();
          renderSectionsEditor();
          sendPreviewUpdate();
        });
        actions.append(button);
      });
      row.append(select, actions);
      list.append(row);
    });
  wrapper.append(list);
  return wrapper;
}

function sectionItemLabel(item, fallbackIndex) {
  if (item?.kind === "native") return item.state.label || item.definition.label;
  if (item?.kind === "builder") return sectionLabel(item.section, fallbackIndex);
  return "Section";
}

function sectionItemType(item) {
  if (item?.kind === "native") return item.state.type || item.definition.type || "Original Section";
  if (item?.kind === "builder") return item.section.type || "Page Builder Section";
  return "";
}

function sectionItemHidden(item) {
  if (item?.kind === "native") return Boolean(item.state.hidden || item.state.deleted);
  if (item?.kind === "builder") return Boolean(item.section.hidden);
  return false;
}

function moveSectionItem(direction) {
  const order = ensureSectionOrder();
  const nextIndex = selectedSectionIndex + direction;
  if (nextIndex < 0 || nextIndex >= order.length) return false;
  [order[selectedSectionIndex], order[nextIndex]] = [order[nextIndex], order[selectedSectionIndex]];
  selectedSectionIndex = nextIndex;
  return true;
}

function toggleSectionItemHidden(item) {
  if (!item) return;
  if (item.kind === "native") {
    item.state.hidden = !item.state.hidden;
    if (!item.state.hidden) item.state.deleted = false;
  } else {
    item.section.hidden = !item.section.hidden;
  }
}

function duplicateSectionItem(item) {
  if (!item) return;
  const sections = currentSections();
  const order = ensureSectionOrder();
  let clone;
  if (item.kind === "builder") {
    clone = JSON.parse(JSON.stringify(item.section));
    clone.id = `section-${Date.now()}`;
    clone.hidden = false;
    clone.title = clone.title || { en: `${sectionItemLabel(item)} copy` };
  } else {
    clone = defaultSection("Custom HTML/Text Block");
    clone.title = {
      en: `${sectionItemLabel(item)} copy`,
      es: `${sectionItemLabel(item)} copy`,
      zh: `${sectionItemLabel(item)} copy`
    };
    clone.body = {
      en: "Duplicated from an original page section. Edit this builder copy as needed.",
      es: "Duplicado desde una sección original. Edite esta copia según sea necesario.",
      zh: "从原始页面板块复制。请根据需要编辑此构建器副本。"
    };
  }
  sections.push(clone);
  const cloneKey = builderSectionKey(clone);
  const insertAt = Math.min(selectedSectionIndex + 1, order.length);
  order.splice(insertAt, 0, cloneKey);
  selectedSectionIndex = insertAt;
}

function deleteSectionItem(item) {
  if (!item) return;
  const order = ensureSectionOrder();
  if (item.kind === "native") {
    item.state.hidden = true;
    item.state.deleted = true;
  } else {
    const sections = currentSections();
    const index = sections.findIndex((section) => section.id === item.section.id);
    if (index >= 0) sections.splice(index, 1);
  }
  pageBuilder.sectionOrder[selectedPage] = order.filter((key) => key !== item.key);
  selectedSectionIndex = Math.max(0, Math.min(selectedSectionIndex, pageBuilder.sectionOrder[selectedPage].length - 1));
  ensureSectionOrder();
}

function renderNativeSectionFields(item) {
  const fields = document.createElement("div");
  fields.className = "nested-editor";
  fields.append(Object.assign(document.createElement("h3"), { textContent: "Original section settings" }));
  fields.append(simpleInput("Section label", item.state.label || item.definition.label, (value) => {
    item.state.label = value || item.definition.label;
  }));
  fields.append(checkboxControl("Hidden", sectionItemHidden(item), (checked) => {
    item.state.hidden = checked;
    if (!checked) item.state.deleted = false;
  }));
  const note = document.createElement("p");
  note.className = "help-text";
  note.textContent = "This original HTML section can be moved, hidden, soft-deleted, or duplicated as an editable builder copy. Use click-to-edit in the preview for the text and visual controls inside it.";
  fields.append(note);
  return fields;
}

function sectionItemByKey(key) {
  return currentSectionItems().find((item) => item.key === key) || null;
}

function selectSectionItem(index, options = {}) {
  const items = currentSectionItems();
  if (!items[index]) return null;
  selectedSectionIndex = index;
  const item = items[index];
  expandedSectionKey = item.key;
  if (options.clearEditable) expandedEditableId = "";
  return item;
}

function focusPreviewSection(item) {
  if (!item) return;
  if (sectionItemHidden(item)) {
    statusMessage.textContent = "This section is hidden. Show it before focusing in preview.";
    return;
  }
  preview.contentWindow?.postMessage({
    type: "mega-furnit-focus-section",
    sectionKey: item.key
  }, "*");
  statusMessage.textContent = `Focused ${sectionItemLabel(item)} in the preview.`;
}

function focusSidebarSection(sectionKey, editableId = "") {
  const index = currentSectionItems().findIndex((item) => item.key === sectionKey);
  if (index < 0) return;
  selectedSectionIndex = index;
  expandedSectionKey = sectionKey;
  if (editableId) expandedEditableId = editableId;
  renderSectionsEditor();
  window.setTimeout(() => {
    const card = sectionsEditor.querySelector(`[data-section-key="${CSS.escape(sectionKey)}"]`);
    card?.scrollIntoView({ behavior: "smooth", block: "center" });
    card?.classList.add("is-attention");
    window.setTimeout(() => card?.classList.remove("is-attention"), 1200);
  }, 0);
}

function editItemElement({ id, type = "text", path = "", source = "", field = "", page = selectedPage, sectionKey = "", sectionIndex = "", productId = "", layerId = "", layerCollection = "", label = "", href = "" }) {
  return { id, type, path, source, field, page, sectionKey, sectionIndex, productId, layerId, layerCollection, label, href };
}

function siteEditItem(key, label, type = "text", sectionKey = "") {
  return {
    id: `site-${key}`,
    label,
    type,
    element: editItemElement({
      id: `site-${key}`,
      type,
      path: `siteContent.${selectedLanguage}.${key}`,
      source: "siteContent",
      field: key,
      sectionKey,
      label
    })
  };
}

function i18nEditItem(key, label, type = "text", sectionKey = "") {
  return {
    id: `i18n-${key}`,
    label,
    type,
    element: editItemElement({
      id: `i18n-${key}`,
      type,
      path: `siteContent.${selectedLanguage}.${key}`,
      source: "siteContent",
      field: key,
      sectionKey,
      label
    })
  };
}

function sectionBackgroundEditItem(item) {
  return {
    id: `section-${item.key.replace(/[^a-z0-9]+/gi, "-")}-background`,
    label: item.kind === "native" ? "Section background" : "Section settings",
    type: item.kind === "native" && item.id === "home-native-0" ? "banner" : "background",
    element: editItemElement({
      id: item.kind === "native" ? `section-${item.key.replace(/[^a-z0-9]+/gi, "-")}` : `section-${item.section.id}`,
      type: item.kind === "native" && item.id === "home-native-0" ? "banner" : "background",
      source: item.kind === "builder" ? "pageBuilder" : "",
      path: item.kind === "builder" ? `pageBuilder.pages.${selectedPage}.${currentSections().findIndex((section) => section.id === item.section.id)}` : "",
      page: selectedPage,
      sectionKey: item.key,
      sectionIndex: item.kind === "builder" ? String(currentSections().findIndex((section) => section.id === item.section.id)) : "",
      label: sectionItemLabel(item)
    })
  };
}

function builderSectionEditItems(item) {
  const section = item.section;
  const sectionIndex = currentSections().findIndex((candidate) => candidate.id === section.id);
  const sectionPath = `pageBuilder.pages.${selectedPage}.${sectionIndex}`;
  const items = [
    {
      id: `section-${section.id}-title`,
      label: "Section title",
      type: "heading",
      element: editItemElement({ id: `section-${section.id}-heading`, type: "heading", path: `${sectionPath}.title`, source: "pageBuilder", field: section.heading ? "heading" : "title", sectionKey: item.key, sectionIndex: String(sectionIndex), label: "Section title" })
    },
    {
      id: `section-${section.id}-body`,
      label: "Section body",
      type: "text",
      element: editItemElement({ id: `section-${section.id}-body`, type: "text", path: `${sectionPath}.body`, source: "pageBuilder", field: section.subtitle ? "subtitle" : "body", sectionKey: item.key, sectionIndex: String(sectionIndex), label: "Section body" })
    },
    {
      id: `section-${section.id}-button`,
      label: "Button / link",
      type: "button",
      element: editItemElement({ id: `section-${section.id}-button`, type: "button", path: `${sectionPath}.buttonText`, source: "pageBuilder", field: "buttonText", sectionKey: item.key, sectionIndex: String(sectionIndex), label: "Button / link", href: section.buttonLink || "" })
    },
    sectionBackgroundEditItem(item)
  ];
  return items.filter((editableItem) => editableItem.type !== "button" || section.buttonText || section.buttonLink || ["Hero Banner", "CTA Banner", "Image Banner", "Custom HTML/Text Block"].includes(section.type));
}

function nativeSectionEditItems(item) {
  const sectionKey = item.key;
  const map = {
    "home-native-0": [
      i18nEditItem("heroEyebrow", "Hero eyebrow", "text", sectionKey),
      siteEditItem("heroTitle", "Hero title", "heading", sectionKey),
      siteEditItem("heroText", "Hero subtitle/body", "text", sectionKey),
      siteEditItem("viewProducts", "View Products button", "button", sectionKey),
      i18nEditItem("requestQuote", "Request Quote button", "button", sectionKey),
      sectionBackgroundEditItem(item)
    ],
    "home-native-1": [
      siteEditItem("metricOwnedNumber", "Owned factories number", "heading", sectionKey),
      i18nEditItem("ownedFactories", "Owned factories label", "text", sectionKey),
      siteEditItem("metricPartnerNumber", "Partner factories number", "heading", sectionKey),
      i18nEditItem("partnerFactories", "Partner factories label", "text", sectionKey),
      siteEditItem("metricRegionalNumber", "Regional programs number", "heading", sectionKey),
      i18nEditItem("regionalPrograms", "Regional programs label", "text", sectionKey),
      sectionBackgroundEditItem(item)
    ],
    "home-native-2": [
      i18nEditItem("trustTitle", "Section heading", "heading", sectionKey),
      i18nEditItem("trustText", "Intro paragraph", "text", sectionKey),
      i18nEditItem("upholsteredTitle", "Upholstered card title", "heading", sectionKey),
      i18nEditItem("upholsteredText", "Upholstered card text", "text", sectionKey),
      i18nEditItem("panelTitle", "Panel furniture card title", "heading", sectionKey),
      i18nEditItem("panelText", "Panel furniture card text", "text", sectionKey),
      i18nEditItem("woodTitle", "Solid wood card title", "heading", sectionKey),
      i18nEditItem("woodText", "Solid wood card text", "text", sectionKey),
      sectionBackgroundEditItem(item)
    ],
    "home-native-3": [
      i18nEditItem("featuredProducts", "Section heading", "heading", sectionKey),
      i18nEditItem("productsIntro", "Intro paragraph", "text", sectionKey),
      sectionBackgroundEditItem(item)
    ],
    "home-native-4": [
      i18nEditItem("supplyTitle", "Section heading", "heading", sectionKey),
      siteEditItem("supplyText", "Supply text", "text", sectionKey),
      i18nEditItem("downloadCatalog", "Download Catalog button", "button", sectionKey),
      i18nEditItem("whatsapp", "WhatsApp button", "button", sectionKey),
      sectionBackgroundEditItem(item)
    ],
    "products-native-0": [i18nEditItem("products", "Page title", "heading", sectionKey), i18nEditItem("productsIntro", "Page intro", "text", sectionKey), sectionBackgroundEditItem(item)],
    "products-native-1": [i18nEditItem("category", "Category filter label", "text", sectionKey), i18nEditItem("factoryType", "Factory filter label", "text", sectionKey), i18nEditItem("style", "Style filter label", "text", sectionKey), sectionBackgroundEditItem(item)],
    "product-detail-native-0": [i18nEditItem("productDetailTitle", "Page title", "heading", sectionKey), i18nEditItem("productDetailIntro", "Page intro", "text", sectionKey), sectionBackgroundEditItem(item)],
    "product-detail-native-1": [sectionBackgroundEditItem(item)],
    "capabilities-native-0": [i18nEditItem("capabilities", "Page title", "heading", sectionKey), siteEditItem("capabilitiesIntro", "Page intro", "text", sectionKey), sectionBackgroundEditItem(item)],
    "capabilities-native-1": [i18nEditItem("factoryNetwork", "Section heading", "heading", sectionKey), sectionBackgroundEditItem(item)],
    "capabilities-native-2": [i18nEditItem("workflowTitle", "Workflow heading", "heading", sectionKey), siteEditItem("supplyText", "Supply text", "text", sectionKey), sectionBackgroundEditItem(item)],
    "about-native-0": [i18nEditItem("about", "Page title", "heading", sectionKey), siteEditItem("aboutIntro", "Page intro", "text", sectionKey), sectionBackgroundEditItem(item)],
    "about-native-1": [siteEditItem("aboutBody", "About body", "text", sectionKey), sectionBackgroundEditItem(item)],
    "contact-native-0": [i18nEditItem("contact", "Page title", "heading", sectionKey), siteEditItem("contactIntro", "Page intro", "text", sectionKey), sectionBackgroundEditItem(item)],
    "contact-native-1": [siteEditItem("formNote", "Form note", "text", sectionKey), sectionBackgroundEditItem(item)],
    "catalog-native-0": [i18nEditItem("downloadCatalog", "Page title", "heading", sectionKey), sectionBackgroundEditItem(item)],
    "catalog-native-1": [sectionBackgroundEditItem(item)]
  };
  return map[item.id] || [sectionBackgroundEditItem(item)];
}

function sectionEditableItems(item) {
  const baseItems = item.kind === "builder" ? builderSectionEditItems(item) : nativeSectionEditItems(item);
  const collectionId = item.kind === "native" && item.id === "home-native-0"
    ? "homeHero"
    : item.kind === "builder"
      ? `${selectedPage}:${item.section.id}`
      : `${selectedPage}:${item.id}`;
  const layerItems = (pageBuilder.layers?.[collectionId] || []).map((layer) => ({
    id: `layer-${layer.id}`,
    label: layer.label || layer.type,
    type: "design-layer",
    element: editItemElement({
      id: `layer-${layer.id}`,
      type: "design-layer",
      source: "pageBuilderLayer",
      layerId: layer.id,
      layerCollection: collectionId,
      page: selectedPage,
      sectionKey: item.key,
      label: layer.label || layer.type
    })
  }));
  return [...baseItems, ...layerItems];
}

function renderInlineEditableItem(editableItem, item) {
  const isOpen = expandedEditableId === editableItem.id;
  const wrapper = document.createElement("div");
  wrapper.className = `editable-item${isOpen ? " is-open" : ""}`;
  wrapper.dataset.editableItemId = editableItem.id;
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "editable-item-toggle";
  toggle.innerHTML = `<strong>${editableItem.label}</strong><span>${editableItem.type}</span>`;
  toggle.addEventListener("click", () => {
    expandedSectionKey = item.key;
    expandedEditableId = isOpen ? "" : editableItem.id;
    selectedElement = editableItem.element;
    renderSelectedElementEditor();
    renderSectionsEditor();
    sendPreviewUpdate();
  });
  wrapper.append(toggle);
  if (isOpen) {
    selectedElement = editableItem.element;
    const controls = selectedElementControlsForType(editableItem.element.type || editableItem.type);
    controls.className = "editable-item-controls";
    wrapper.append(controls);
  }
  return wrapper;
}

function sectionActionButton(label, handler, disabled = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = label === "Delete" ? "danger-button tiny-button" : "secondary-button tiny-button";
  button.textContent = label;
  button.disabled = disabled;
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    handler();
    renderSectionsEditor();
    sendPreviewUpdate();
  });
  return button;
}

function renderSectionCard(item, index, items) {
  const isOpen = expandedSectionKey ? expandedSectionKey === item.key : index === selectedSectionIndex;
  const card = document.createElement("article");
  card.className = `section-card${index === selectedSectionIndex ? " is-active" : ""}${isOpen ? " is-open" : ""}${sectionItemHidden(item) ? " is-hidden" : ""}`;
  card.dataset.sectionKey = item.key;

  const header = document.createElement("button");
  header.type = "button";
  header.className = "section-card-header";
  const tags = [
    sectionItemType(item),
    item.kind === "native" ? "Original" : "Builder",
    sectionItemHidden(item) ? "Hidden" : "",
    index === 0 ? "First" : "",
    index === items.length - 1 ? "Last" : ""
  ].filter(Boolean).join(" · ");
  header.innerHTML = `<strong>${sectionItemLabel(item, index)}</strong><span>${tags}</span>`;
  header.addEventListener("click", () => {
    selectedSectionIndex = index;
    expandedSectionKey = isOpen ? "" : item.key;
    renderSectionsEditor();
  });
  header.addEventListener("dblclick", (event) => {
    event.preventDefault();
    selectedSectionIndex = index;
    expandedSectionKey = item.key;
    focusPreviewSection(item);
    renderSectionsEditor();
  });
  card.append(header);

  if (!isOpen) return card;

  const actions = document.createElement("div");
  actions.className = "section-actions";
  actions.append(
    sectionActionButton("Move up", () => moveSectionItem(-1), index <= 0),
    sectionActionButton("Move down", () => moveSectionItem(1), index >= items.length - 1),
    sectionActionButton(sectionItemHidden(item) ? "Show" : "Hide", () => toggleSectionItemHidden(item)),
    sectionActionButton("Duplicate", () => duplicateSectionItem(item)),
    sectionActionButton("Delete", () => deleteSectionItem(item))
  );
  card.append(actions);

  const itemSettings = item.kind === "builder" ? renderSectionFields(item.section) : renderNativeSectionFields(item);
  itemSettings.classList.add("section-settings");
  card.append(itemSettings);

  const editables = document.createElement("div");
  editables.className = "editable-item-list";
  sectionEditableItems(item).forEach((editableItem) => editables.append(renderInlineEditableItem(editableItem, item)));
  card.append(editables, renderLayerManagerForItem(item));
  return card;
}

function renderLayerManagerForItem(item) {
  const previousIndex = selectedSectionIndex;
  const index = currentSectionItems().findIndex((candidate) => candidate.key === item.key);
  if (index >= 0) selectedSectionIndex = index;
  const manager = renderLayerManager();
  selectedSectionIndex = previousIndex;
  return manager;
}

function renderSectionsEditor() {
  sectionsEditor.innerHTML = "";
  sectionsEditor.append(Object.assign(document.createElement("h2"), { textContent: "Page Sections" }));
  const sections = currentSections();
  const order = ensureSectionOrder();
  let items = currentSectionItems();
  const addRow = document.createElement("div");
  addRow.className = "button-row";
  const typeSelect = document.createElement("select");
  SECTION_TYPES.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeSelect.append(option);
  });
  const add = document.createElement("button");
  add.type = "button";
  add.className = "secondary-button";
  add.textContent = "Add section";
  add.addEventListener("click", () => {
    const section = defaultSection(typeSelect.value);
    sections.push(section);
    const insertAt = items.length ? Math.min(selectedSectionIndex + 1, order.length) : order.length;
    order.splice(insertAt, 0, builderSectionKey(section));
    selectedSectionIndex = insertAt;
    renderSectionsEditor();
    sendPreviewUpdate();
  });
  addRow.append(typeSelect, add);
  sectionsEditor.append(addRow);
  items = currentSectionItems();
  const list = document.createElement("div");
  list.className = "section-card-list";
  items.forEach((item, index) => list.append(renderSectionCard(item, index, items)));
  sectionsEditor.append(list);
}

function renderContentFields() {
  contentEditor.innerHTML = "";
  contentEditor.classList.toggle("is-hidden", selectedPage !== "products");
  if (selectedPage !== "products") return;
  const title = document.createElement("h2");
  title.textContent = "Products collection";
  contentEditor.append(title);

  renderProductEditor();
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
  if (typeof window.netlifyIdentity.init === "function") {
    window.netlifyIdentity.init();
  }
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
  if (![200, 404].includes(current.status)) {
    throw new Error(`Unable to read ${path} from Git Gateway.`);
  }
  const currentJson = current.status === 200 ? await current.json() : null;
  const body = {
    message: `Update ${path} from visual editor`,
    content: toBase64Unicode(JSON.stringify(data, null, 2))
  };
  if (currentJson?.sha) body.sha = currentJson.sha;
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
    if (!token) {
      statusMessage.textContent = "Please log in with Netlify Identity before saving.";
      if (window.netlifyIdentity?.open) window.netlifyIdentity.open("login");
      return;
    }
    for (const [path, file] of pendingUploads.entries()) {
      await saveGitGatewayAsset(path, file, token);
    }
    await saveGitGatewayFile("data/site-content.json", siteContent, token);
    await saveGitGatewayFile("data/products.json", productData, token);
    await saveGitGatewayFile("data/page-builder.json", pageBuilder, token);
    statusMessage.textContent = "Saved to GitHub successfully. Netlify will redeploy from the commit.";
  } catch (error) {
    console.warn(error);
    localStorage.setItem("megaFurnitVisualEditorSiteContent", JSON.stringify(siteContent));
    localStorage.setItem("megaFurnitVisualEditorProducts", JSON.stringify(productData));
    localStorage.setItem("megaFurnitVisualEditorPageBuilder", JSON.stringify(pageBuilder));
    statusMessage.textContent = "Git Gateway save failed. Download fallback available.";
  }
}

function downloadChanges() {
  downloadFile("site-content.json", siteContent);
  downloadFile("products.json", productData);
  downloadFile("page-builder.json", pageBuilder);
  statusMessage.textContent = "Downloaded updated JSON files.";
}

window.addEventListener("message", (event) => {
  if (event.data?.type === "mega-furnit-section-focused") {
    if (event.data.page && event.data.page !== selectedPage) return;
    focusSidebarSection(event.data.sectionKey, event.data.editableId);
    return;
  }
  if (event.data?.type !== "mega-furnit-element-selected") return;
  selectedElement = event.data.element;
  if (selectedElement?.page === selectedPage && selectedElement.sectionKey) {
    const index = currentSectionItems().findIndex((item) => item.key === selectedElement.sectionKey);
    if (index >= 0) {
      selectedSectionIndex = index;
      expandedSectionKey = selectedElement.sectionKey;
      expandedEditableId = selectedElement.id || expandedEditableId;
    }
    renderSectionsEditor();
  } else if (selectedElement?.page === selectedPage && selectedElement.sectionIndex !== undefined) {
    const section = pageBuilder.pages?.[selectedPage]?.[Number(selectedElement.sectionIndex)];
    const key = section ? builderSectionKey(section) : "";
    const index = currentSectionItems().findIndex((item) => item.key === key);
    selectedSectionIndex = index >= 0 ? index : Number(selectedElement.sectionIndex);
    if (key) expandedSectionKey = key;
    expandedEditableId = selectedElement.id || expandedEditableId;
    renderSectionsEditor();
  }
  renderSelectedElementEditor();
  sendPreviewUpdate();
});

async function init() {
  [siteContent, productData, pageBuilder] = await Promise.all([
    loadJson("/data/site-content.json"),
    loadJson("/data/products.json"),
    loadOptionalJson("/data/page-builder.json", { theme: { ...THEME_DEFAULTS }, pages: {} })
  ]);
  productData = normalizeProductData(productData);
  ensureLanguageObjects();
  ensurePageBuilder();
  pageSelector.addEventListener("change", () => {
    selectedPage = pageSelector.value;
    selectedSectionIndex = 0;
    selectedElement = null;
    renderSelectedElementEditor();
    renderContentFields();
    renderThemeEditor();
    renderSectionsEditor();
    loadPreviewPage();
  });
  languageSelector.addEventListener("change", () => {
    selectedLanguage = languageSelector.value;
    selectedElement = null;
    renderSelectedElementEditor();
    renderContentFields();
    renderThemeEditor();
    renderSectionsEditor();
    sendPreviewUpdate();
  });
  preview.addEventListener("load", sendPreviewUpdate);
  document.querySelector("#saveButton").addEventListener("click", saveChanges);
  document.querySelector("#downloadButton").addEventListener("click", downloadChanges);
  document.querySelector("#aiImproveButton").addEventListener("click", () => requestAiDraft("improve"));
  document.querySelector("#aiTranslateButton").addEventListener("click", () => requestAiDraft("translate"));
  document.querySelector("#aiProductDescriptionButton").addEventListener("click", () => requestAiDraft("product_description"));
  aiApplyButton.addEventListener("click", applyAiDraft);
  editModePreview.addEventListener("click", () => setPreviewInteractionMode("edit"));
  navigateModePreview.addEventListener("click", () => setPreviewInteractionMode("navigate"));
  document.querySelector("#desktopPreview").addEventListener("click", () => iframeWrap.className = "iframe-wrap is-desktop");
  document.querySelector("#mobilePreview").addEventListener("click", () => iframeWrap.className = "iframe-wrap is-mobile");
  renderSelectedElementEditor();
  renderThemeEditor();
  renderSectionsEditor();
  renderContentFields();
  loadPreviewPage();
}

init().catch((error) => {
  console.error(error);
  statusMessage.textContent = "The visual editor could not load the CMS JSON files.";
});
