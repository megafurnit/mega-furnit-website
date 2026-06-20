# Mega Furnit Media Upload Notes

This project stores Visual Editor image uploads in the repository so the static website remains compatible with Netlify and GitHub.

## Storage Location

Uploaded images are stored here:

```text
assets/images/uploads/
```

The Visual Editor queues selected images and commits them through Netlify Identity and Git Gateway when you click Save.

## Supported Image Types

Supported formats:

- JPG / JPEG
- PNG
- WebP
- GIF

Recommended maximum size:

- 2 MB is best.
- 5 MB is the current upload limit in the Visual Editor.

Large images can slow the public website. Resize or optimize product photos before uploading when possible.

## File Naming

The Visual Editor creates safe filenames:

- lowercase
- hyphenated
- no spaces
- unsafe characters removed
- timestamp suffix added to avoid overwriting older files

Example:

```text
assets/images/uploads/modern-sectional-sofa-20260620-153012.jpg
```

## Image Areas Supported

The Visual Editor can upload or replace images for:

- Product main image
- Product gallery images
- Hero/background image path
- Image Banner section image
- Image Gallery section images
- Image design layer path

## Product Gallery Data

Products keep the existing main image field:

```json
{
  "image": "assets/images/uploads/product-main.jpg"
}
```

Products may also include a gallery:

```json
{
  "gallery": [
    "assets/images/uploads/product-main.jpg",
    "assets/images/uploads/product-angle-2.jpg",
    "assets/images/uploads/product-detail-1.jpg"
  ]
}
```

Product cards continue to use `image` as the cover image. Gallery thumbnails appear on product detail pages when `gallery` exists.

Use "Set cover" in the Visual Editor if a gallery image should become the main product image.

## Video Upload

Video upload is not included yet. Video paths may exist as plain text fields for future use, but local video file upload should be planned separately because video files are much larger than images.

## If an Image Path Is Wrong

If an image is broken:

1. Open the Visual Editor.
2. Find the product, section, or layer with the wrong image.
3. Replace the image path or upload a new image.
4. Click Save.
5. Wait for Netlify to redeploy.

If a bad image path was saved:

- Use GitHub file history to restore the previous `data/products.json` or `data/page-builder.json` value.
- If the image file itself is missing, upload it again through the Visual Editor or Decap CMS.

## Backup Reminder

Before replacing live JSON files, back up:

- `data/site-content.json`
- `data/products.json`
- `data/page-builder.json`

See `docs/backup-and-recovery-workflow.md` for recovery steps.

