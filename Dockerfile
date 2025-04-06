FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with optimizations to reduce memory usage
RUN npm install --legacy-peer-deps --no-optional

# Copy the rest of the application
COPY . .

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