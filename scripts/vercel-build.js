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
    // Clean previous builds and node_modules
    console.log('🧹 Cleaning previous builds and installations...');
    execSync('rm -rf dist build .cache .tmp node_modules', { stdio: 'inherit' });

    // Install dependencies using npm ci for exact version matching
    console.log('📦 Installing dependencies with npm ci...');
    execSync('npm ci', { stdio: 'inherit' });

    // Ensure PostgreSQL client is installed
    console.log('📦 Ensuring PostgreSQL client is installed...');
    execSync('npm install pg --save', { stdio: 'inherit' });

    // Double-check for Strapi plugin installation
    console.log('🔍 Verifying Strapi plugins installation...');

    const pluginsToVerify = [
        '@strapi/plugin-content-manager',
        '@strapi/plugin-content-type-builder',
        '@strapi/plugin-users-permissions',
        '@strapi/plugin-i18n'
    ];

    for (const plugin of pluginsToVerify) {
        try {
            // Check if the plugin package.json exists
            require.resolve(`${plugin}/package.json`);
            console.log(`✅ ${plugin} is properly installed`);
        } catch (err) {
            // If not, manually install it
            console.log(`⚠️ ${plugin} not found, installing it...`);
            execSync(`npm install ${plugin}@4.15.5 --no-save`, { stdio: 'inherit' });
        }
    }

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