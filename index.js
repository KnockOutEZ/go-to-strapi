const strapi = require('@strapi/strapi');

const app = strapi({ distDir: process.cwd() });

module.exports = app.start(); 