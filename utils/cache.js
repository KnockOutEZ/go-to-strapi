class Cache {
    constructor() {
        this.cache = new Map();
    }

    set(key, value, ttl = 3600000) { // Default TTL: 1 hour in milliseconds
        const item = {
            value,
            expiry: Date.now() + ttl
        };
        this.cache.set(key, item);
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }

    clear() {
        this.cache.clear();
    }

    // Clean up expired items
    cleanup() {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now > item.expiry) {
                this.cache.delete(key);
            }
        }
    }
}

// Create a singleton instance
const cache = new Cache();

// Run cleanup every 5 minutes
setInterval(() => cache.cleanup(), 5 * 60 * 1000);

module.exports = cache; 