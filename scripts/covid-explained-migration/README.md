# Covid Explained Migration

> Scripts to support content migration from Covid Explained.

Covid Explained (CE) uses Netlify CMS, but articles in CE have a different structure than the articles in CAN, so the scripts need to transform the structure of the content before we can use them in CAN.

In addition, internal links in the content of the articles will need to be translated or removed to match links in CAN.

The script assumes that the repository `covid-explained` is available locally

## Reporting Internal Links

1. Update the `covid-explained-migration.ts` file to run `reportInternalLinks`

```ts
if (require.main === module) {
  reportInternalLinks()
    .then(() => {
      console.log('Done');
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(-1);
    });
}
```

2. Run `yarn migrate-covid-explained`
