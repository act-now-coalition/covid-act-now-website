const withImages = require('next-images');

module.exports = withImages({
    /* abortive attempt to reduce bundle size by eliminating locale handling : / 
    doesn't work with export
    i18n: {
        // These are all the locales you want to support in
        // your application
        locales: ['en-US'],
        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        defaultLocale: 'en-US',
    },
    */
    // might want to disable this for actual production but it is very handy in prototyping
    productionBrowserSourceMaps: true,
    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            // we want to add static redirects, not replace them.
            ...defaultPathMap,
            // FIXME '/explained': { page: '/learn' },
            // this is tricky and has some internal routing '/updates': { page: '/covid-explained' },
            // FIXME '/tools': { page: '/data-api' },
            // FIXME '/resources': { page: '/data-api' },
            //'/contact': { page: '/about#contact-us' },
            // FIXME temp'/all': { page: '/internal/all' },
            // FIXME '/model': { page: '/faq' },
        }
    }

})
