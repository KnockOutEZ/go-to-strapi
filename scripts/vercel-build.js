const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure we're in production mode
process.env.NODE_ENV = 'production';

// Function to execute commands and log output
const exec = (cmd) => {
    console.log(`Running: ${cmd}`);
    try {
        execSync(cmd, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Command failed: ${cmd}`);
        console.error(error.message);
        process.exit(1);
    }
};

console.log('🚀 Starting Vercel optimized build process...');

try {
    // Clean previous builds
    console.log('🧹 Cleaning previous builds...');
    exec('rm -rf dist build .cache .tmp');

    // Install only production dependencies to reduce size
    console.log('📦 Installing production dependencies...');
    exec('npm ci --only=production');

    // Ensure essential plugins are installed
    console.log('🔌 Installing essential Strapi plugins...');
    exec('npm install --no-save @strapi/plugin-content-manager@4.15.5 @strapi/plugin-content-type-builder@4.15.5 @strapi/plugin-users-permissions@4.15.5 @strapi/plugin-i18n@4.15.5 @strapi/plugin-email@4.15.5 pg');

    // Generate app secrets if needed
    console.log('🔑 Generating secrets...');
    if (fs.existsSync('scripts/generate-secrets.js')) {
        exec('node scripts/generate-secrets.js');
    }

    // Build the Strapi app
    console.log('🏗️ Building Strapi app...');
    exec('npm run build');

    console.log('💻 Creating optimized Vercel deployment...');

    // Create a lightweight package.json for Vercel
    const pkg = require('../package.json');
    const vercelPkg = {
        name: pkg.name,
        version: pkg.version,
        private: true,
        dependencies: {
            '@strapi/strapi': pkg.dependencies['@strapi/strapi'],
            '@strapi/plugin-content-manager': pkg.dependencies['@strapi/plugin-content-manager'],
            '@strapi/plugin-content-type-builder': pkg.dependencies['@strapi/plugin-content-type-builder'],
            '@strapi/plugin-users-permissions': pkg.dependencies['@strapi/plugin-users-permissions'],
            '@strapi/plugin-i18n': pkg.dependencies['@strapi/plugin-i18n'],
            '@strapi/plugin-email': pkg.dependencies['@strapi/plugin-email'],
            'pg': pkg.dependencies['pg']
        },
        engines: pkg.engines
    };

    fs.writeFileSync('dist/package.json', JSON.stringify(vercelPkg, null, 2));

    // Create a minimal package-lock.json to help with installs
    console.log('📄 Copying minimal build files...');
    if (fs.existsSync('package-lock.json')) {
        fs.copyFileSync('package-lock.json', 'dist/package-lock.json');
    }

    // Copy the index.js file to dist for Vercel entry point
    fs.copyFileSync('index.js', 'dist/index.js');

    // Ensure config exists in the dist folder
    if (!fs.existsSync('dist/config')) {
        fs.mkdirSync('dist/config', { recursive: true });
    }

    console.log('✅ Build completed successfully!');
} catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
} 