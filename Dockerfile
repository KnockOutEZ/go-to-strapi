FROM node:18-bullseye

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy scripts directory first (needed for postinstall)
COPY scripts ./scripts/

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Environment variables
ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=1337
ENV FRONTEND_URL=https://go-to-strapi.onrender.com
ENV PUBLIC_URL=https://strapi-backend.onrender.com

# Expose port
EXPOSE 1337

# Start Strapi in development mode
CMD ["npm", "run", "develop"] 