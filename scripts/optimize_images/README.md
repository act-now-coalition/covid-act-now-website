# Optimizing Static Images

Static images can take a long time to load on web pages, we can resize the images
to make sure that they are not larger than what we need.

The build process copies imported images from their original locations to `build/static/media`, but it doesn't optimize their size. To reduce the image dimensions, we need to manually resize the images with `yarn optimize-images`. For this to work, we need to:

1. Add the images and either its rendered width or height to `static-images.ts`
2. Run `yarn optimize-images`
3. Commit the changes and push.

The original images will be saved along with the original image (renaming `image.png` as `image-original.png`), but they will not be included in the build.

## Example

The original image `src/assets/images/ghss.png` (761K) has size 4119x1623 pixels, but it's rendered with max-width of 216 px. To optimize it, we need to:

1. Add the image to `scripts/optimize_images/static-images.ts` with either its final width or height (the aspect ratio will be preserved)

```ts
  {
    path: 'src/assets/images/ghss.png',
    width: 216,
  },
```

2. Run `yarn optimize-images`, this will save a copy of the original image as `ghss-original.png` and reduce the image size of `ghss.png` to 216x81 (12K).
