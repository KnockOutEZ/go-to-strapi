const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const generateSecret = () => crypto.randomBytes(32).toString('base64');

const secrets = {
    APP_KEYS: `${generateSecret()},${generateSecret()},${generateSecret()},${generateSecret()}`,
    API_TOKEN_SALT: generateSecret(),
    ADMIN_JWT_SECRET: generateSecret(),
    TRANSFER_TOKEN_SALT: generateSecret(),
    JWT_SECRET: generateSecret()
};

const envPath = path.join(__dirname, '..', '.env');
let envContent = '';

// Read existing .env file if it exists
if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
}

// Update or add secrets
Object.entries(secrets).forEach(([key, value]) => {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
        envContent += `\n${key}=${value}`;
    }
});

// Write back to .env file
fs.writeFileSync(envPath, envContent.trim() + '\n');

console.log('✅ Secrets generated successfully!');
console.log('📝 Update your .env file with the new secrets.'); 