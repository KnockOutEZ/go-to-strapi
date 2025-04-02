module.exports = ({ env }) => ({
    settings: {
        cors: {
            enabled: true,
            origin: [
                'http://localhost:1337',
                'http://localhost:3000',
                'https://go-to-strapi.onrender.com',
                'https://strapi-backend.onrender.com',
                env('FRONTEND_URL', ''),
                // Add any other domains you need here
            ],
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
            headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
        },
    },
}); 