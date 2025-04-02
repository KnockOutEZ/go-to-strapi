// Optimize for Vercel serverless environment
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Handle startup errors more gracefully
try {
    const strapi = require('@strapi/strapi');

    // Force minimal mode for serverless
    const app = strapi({
        distDir: process.cwd(),
        autoReload: false,
        serveAdminPanel: true,
    });

    // Export the Strapi instance
    module.exports = app.start();
} catch (err) {
    console.error('Strapi initialization error:');
    console.error(err);

    // Return a minimal viable API for error cases
    module.exports = (req, res) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: true,
            message: 'Strapi initialization failed',
            details: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
        }));
    };
} 