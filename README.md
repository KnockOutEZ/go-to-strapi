# Strapi Production Template

A production-ready Strapi template with PostgreSQL, caching, and deployment configurations.

## Features

- PostgreSQL database integration
- In-memory caching for better performance
- Production-ready security configurations
- Docker containerization
- Render.com deployment support
- Environment variable management
- TypeScript support
- Automated build and deployment scripts

## Prerequisites

- Node.js >= 18.0.0
- PostgreSQL database
- Docker (for containerized deployment)
- Render.com account (for cloud deployment)

## Quick Start

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your environment variables
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run develop
   ```

## Environment Variables

Required environment variables:

```env
# Server
HOST=0.0.0.0
PORT=1337

# Secrets (generate using: openssl rand -base64 32)
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
JWT_SECRET=your-jwt-secret-here

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=your-database-host
DATABASE_PORT=5432
DATABASE_NAME=your-database-name
DATABASE_USERNAME=your-database-username
DATABASE_PASSWORD=your-database-password
DATABASE_SSL=true
DATABASE_POOL_MIN=0
DATABASE_POOL_MAX=10
DATABASE_POOL_IDLE_TIMEOUT=30000
DATABASE_DEBUG=false
```

## Deployment Options

### Docker Deployment

1. Make sure Docker is installed on your system
2. Configure your `.env` file with appropriate values
3. Build and run the Docker container:
   ```bash
   npm run docker:build
   npm run docker:run
   ```
4. Access the Strapi admin at http://localhost:1337/admin

### Render.com Deployment

1. Push your code to GitHub
2. Connect your repository to Render.com
3. Create a new Blueprint with the following settings:
   - Environment: Docker
   - Branch: main (or your preferred branch)
4. Deploy! Render will automatically use the render.yaml file

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm run start
   ```

## Security Best Practices

- All sensitive data is stored in environment variables
- Database credentials are never committed to the repository
- SSL is enabled for database connections
- JWT secrets are properly configured
- CORS is configured for production

## Performance Optimization

- In-memory caching for API responses
- Database connection pooling
- Optimized build configuration
- Production-ready middleware setup
- Docker containerization for consistent environment

## Development

- TypeScript support
- Hot reloading
- Development-specific configurations
- Debug mode support

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT
