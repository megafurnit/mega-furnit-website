# Mega Furnit JSON Schema Notes

This project uses JSON files as live website data. Treat them as user content, not disposable build artifacts.

## Shared Metadata

The main JSON files may include a `_schema` object:

```json
{
  "_schema": {
    "schemaVersion": "1.0.0",
    "dataType": "site-content",
    "lastUpdatedBy": "Mega Furnit Visual Editor"
  }
}
```

The public site and editor must remain legacy-compatible if `_schema` is missing.

## `data/site-content.json`

Stores multilingual site copy for English, Spanish, and Chinese.

Main content keys:

- `en`, `es`, `zh`: language objects.
- Homepage fields such as `heroTitle`, `heroText`, `viewProducts`, metric numbers, and supply-chain text.
- About, capabilities, and contact content.
- Shared labels such as brand/footer/language labels when managed by the Visual Editor.

User content risk: high. Do not overwrite this file with an old ZIP unless the goal is to replace live website copy.

## `data/products.json`

Stores the product catalog.

Main content keys:

- `_schema`: optional schema metadata.
- `products`: array of product records.
- Each product should keep `id`, multilingual `name`, `category`, `style`, `description`, `materials`, image path, factory type, dimensions, MOQ, FOB status, loading quantity, and custom options.

User content risk: high. This file controls product cards, filters, product detail pages, and inquiry context.

## `data/page-builder.json`

Stores editor layout and visual state.

Main content keys:

- `theme`: global theme settings.
- `pages`: custom Page Builder sections by page.
- `layers`: free component/design layer collections.
- `nativeSections`: metadata and hidden/deleted state for original HTML sections.
- `sectionOrder`: ordering for native and builder sections.
- `elementStyles`: optional click-to-edit style overrides.

User content and editor state risk: very high. This file controls layout, section order, hidden/deleted state, theme settings, and visual layers.

## Fragile Areas

- Native section IDs must match HTML `data-section-id` values.
- `sectionOrder` entries use `native:<id>` and `builder:<id>`.
- Product IDs are used in URLs such as `product-detail.html?id=MF-SF001`.
- Old deployment ZIPs can revert content, products, layout, or hidden/deleted state.

