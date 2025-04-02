const cache = require('../utils/cache');

const CACHE_TTL = 3600000; // 1 hour in milliseconds

const cacheMiddleware = (ttl = CACHE_TTL) => {
    return async (ctx, next) => {
        const key = `strapi:${ctx.request.url}`;

        try {
            // Try to get data from cache
            const cachedData = cache.get(key);

            if (cachedData) {
                ctx.body = cachedData;
                return;
            }

            // If no cache, proceed with normal request
            await next();

            // Cache the response
            if (ctx.body) {
                cache.set(key, ctx.body, ttl);
            }
        } catch (error) {
            console.error('Cache middleware error:', error);
            await next();
        }
    };
};

module.exports = cacheMiddleware; 