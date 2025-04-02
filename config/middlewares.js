module.exports = [
    'strapi::errors',
    {
        name: 'strapi::security',
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'connect-src': ["'self'", 'https:'],
                    'img-src': ["'self'", 'data:', 'blob:', 'https://go-to-strapi.onrender.com', 'https://strapi-backend.onrender.com'],
                    'media-src': ["'self'", 'data:', 'blob:', 'https://go-to-strapi.onrender.com', 'https://strapi-backend.onrender.com'],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
]; 