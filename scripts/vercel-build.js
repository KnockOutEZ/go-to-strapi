const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure we're in production mode
process.env.NODE_ENV = 'production';

// Create necessary directories
const dirs = ['dist', 'build', '.cache', '.tmp'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Run the build
console.log('🚀 Starting build process...');

try {
    // Clean previous builds
    console.log('🧹 Cleaning previous builds...');
    execSync('rm -rf dist build .cache .tmp', { stdio: 'inherit' });

    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Generate secrets if needed
    console.log('🔑 Generating secrets...');
    execSync('node scripts/generate-secrets.js', { stdio: 'inherit' });

    // Build Strapi
    console.log('🏗️ Building Strapi...');
    execSync('npm run build', { stdio: 'inherit' });

    // Verify build
    if (!fs.existsSync('dist')) {
        throw new Error('Build failed: dist directory not found');
    }

    console.log('✅ Build completed successfully!');
} catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
} 