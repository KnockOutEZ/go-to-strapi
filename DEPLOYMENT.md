# Deployment Guide

This guide provides detailed instructions for deploying the Strapi backend using Docker and Render.com.

## Running with Docker (Local or Self-hosted)

### Prerequisites
- Docker installed
- Git repository cloned

### Steps

1. **Set up environment variables**

   The repository already includes a configured `.env` file with valid PostgreSQL credentials. You can use these existing credentials or update them with your own:

   ```env
   # Database credentials (already configured in .env)
   DATABASE_CLIENT=postgres
   DATABASE_HOST=postgres
   DATABASE_PORT=5432
   DATABASE_NAME=postgres
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=postgres
   DATABASE_SSL=true
   ```

   If you need to generate new secrets, you can use:
   ```bash
   openssl rand -base64 32 # Run this 5 times for the 5 different secret keys
   ```

2. **Build and run the Docker container**

   ```bash
   # Build the Docker image
   npm run docker:build
   
   # Run the Docker container with existing database credentials
   npm run docker:run
   ```

   Or use Docker commands directly (ensure you're in the backend directory):
   ```bash
   docker build -t strapi-api .
   docker run -p 1337:1337 --env-file $(pwd)/.env strapi-api
   ```

3. **Access the application**

   Once the container is running, you can access:
   - Strapi API: http://localhost:1337
   - Strapi Admin: http://localhost:1337/admin

## Deploying to Render.com

### Prerequisites
- GitHub repository with your Strapi project
- Render.com account

### Steps

1. **Prepare Your Repository**

   Make sure your repository includes:
   - Dockerfile
   - render.yaml
   - .env (or .env.example)

2. **Connect to Render.com**

   - Log in to your Render dashboard
   - Click on "New" and select "Blueprint"
   - Connect your GitHub repository
   - Select the repository and branch you want to deploy

3. **Configure and Deploy**

   You have two options for database configuration:
   
   a) **Use existing PostgreSQL database**:
      - Add the existing database credentials from your .env file to the Render dashboard environment variables
   
   b) **Let Render create a new PostgreSQL database**:
      - Render will automatically detect the render.yaml configuration and provision a new PostgreSQL database

4. **Environment Variables**

   If using the existing PostgreSQL database, ensure these environment variables are set in the Render dashboard:
   ```
   DATABASE_CLIENT=postgres
   DATABASE_HOST=postgres
   DATABASE_PORT=5432
   DATABASE_NAME=postgres
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=postgres
   DATABASE_SSL=true
   ```

   Also, ensure the following secret keys are set (Render can generate these for you):
   ```
   APP_KEYS
   API_TOKEN_SALT
   ADMIN_JWT_SECRET
   TRANSFER_TOKEN_SALT
   JWT_SECRET
   ```

5. **Deployment Process**

   Render will:
   - Build your Docker image
   - Deploy the web service
   - Connect to your specified database

6. **Access Your Deployed Application**

   Once deployment is complete, you can access your Strapi instance at the URL provided by Render.

## Troubleshooting

### Docker Issues

- **Database connection errors**: Ensure your database connection details are correct in the .env file
- **Permission issues**: Check that the Docker container has necessary permissions

### Render.com Issues

- **Build failures**: Check the build logs for specific errors
- **Database connection issues**: Verify that the database is properly provisioned and connected
- **Environment variable problems**: Make sure all required environment variables are defined

## Updating Deployed Application

### Docker Deployment

```bash
git pull                     # Get latest code
npm run docker:build         # Rebuild the image
npm run docker:stop          # Stop running container
npm run docker:run           # Run new container
```

### Render.com Deployment

Render automatically deploys when you push changes to your repository. You can also trigger manual deploys from the Render dashboard. 