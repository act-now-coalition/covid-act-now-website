# Optimizing Static Images

Static images can take a long time to load on web pages, we can resize the images
to make sure that they are not larger than what we need.

The build process copies imported images from their original locations to `build/static/media`, but it doesn't optimize their size. To reduce the image dimensions, we need to manually resize the images with `yarn optimize-images`. For this to work, we need to:

1. Add the images and either its rendered width or height to `static-images.ts`
2. Run `yarn optimize-images`
3. Commit the changes and push.

The original images will be saved along with the original image (renaming `image.png` as `image-original.png`), but they will not be included in the build.

Some CMS images have a specific purpose and target size (team headshots, for example), those should be imported in `static-images.ts` and resized too. Images that are part of the markdown body will need to be resized to the maximum width of the text content in those pages.

## Example

The original image `src/assets/images/ghss.png` (761K) has size 4119x1623 pixels, but it's rendered with max-width of 216 px. To optimize it, we need to:

1. Add the image to `scripts/optimize_images/static-images.ts` with either its final width or height (the aspect ratio will be preserved), and the path to where to store a copy of the original image:

```ts
  {
    inputPath: 'src/assets/images/ghss.png',
    originalPath: 'src/assets/images/ghss-original.png',
    width: 216,
  },
```

2. Run `yarn optimize-images`, this will save the copy of the original image and reduce the image size of `ghss.png` to 216x81 (12K).
