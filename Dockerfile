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

# Build the Strapi app
RUN npm run build

# Environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337
ENV FRONTEND_URL=https://go-to-strapi.onrender.com

# Expose port
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "start"] 