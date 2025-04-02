const cache = require('./utils/cache');

module.exports = async (strapi) => {
    // Add cache middleware to all routes
    strapi.server.use(async (ctx, next) => {
        // Skip caching for admin routes and POST/PUT/DELETE requests
        if (ctx.request.url.startsWith('/admin') ||
            ['POST', 'PUT', 'DELETE'].includes(ctx.request.method)) {
            return next();
        }

        const key = `strapi:${ctx.request.url}`;

        try {
            const cachedData = cache.get(key);

            if (cachedData) {
                ctx.body = cachedData;
                return;
            }

            await next();

            if (ctx.body) {
                cache.set(key, ctx.body, 3600000); // 1 hour cache
            }
        } catch (error) {
            console.error('Cache error:', error);
            await next();
        }
    });
}; 