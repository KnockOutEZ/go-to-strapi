FROM node:18-slim

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with optimizations to reduce memory usage
RUN npm install --legacy-peer-deps --no-optional

# Copy the rest of the application
COPY . .

# Rebuild native modules
RUN npm rebuild @swc/core

# Build the admin panel
RUN npm run build

# Environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337
ENV FRONTEND_URL=https://go-to-strapi.onrender.com
ENV PUBLIC_URL=https://strapi-backend.onrender.com
# Memory optimization for Node.js
ENV NODE_OPTIONS="--max-old-space-size=400"

# Expose port
EXPOSE 1337

# Start Strapi in production mode
CMD ["npm", "run", "start"] 