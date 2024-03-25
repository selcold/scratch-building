/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://scratch-building.vercel.app",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        additionalSitemaps: [
            'https://scratch-building.vercel.app/sitemap.xml',
        ],
    },
};