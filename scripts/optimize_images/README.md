# Optimizing Static Images

Static images can take a long time to load on web pages. In order to make this
faster, we can optimize them in two ways:

- Reduce the image resolution to be appropiate to most devices
- Reduce the image dimensions

The build process automatically reduces the image resolution, however, it does
not optimize the image size, because it has no way to know the size of the
rendered image (`width` and `height` attributes on the `img` tag).

In order to reduce the image dimensions, we need to manually resize the images
with `yarn optimize-images`. For this to work, we need to:

1. Add the images and either its rendered width or height to `scripts/optimize_images/static-images.ts`
2. Run `yarn optimize-images`
3. Commit the changes and push.

## Example

The image `src/assets/images/ghss.png` (761KB) has size 4119x1623 pixels, but it's always
rendered with max-width 216.

1. Add the image to `scripts/optimize_images/static-images.ts` with
   either its final width or height (the aspect ratio will be preserved)

```ts
  {
    path: 'src/assets/images/ghss.png',
    width: 216,
  },
```

2. Run `yarn optimize-images`, this will resize the images so they have their optimal size.
3. Commit the changes and push.
