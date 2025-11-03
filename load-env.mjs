// load-env.mjs
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Load .env from custom directory (e.g. /docker/)
const envPath = path.resolve('./docker/.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`✅ Loaded env from: ${envPath}`);
} else {
  console.warn(`⚠️ No .env file found at ${envPath}`);
}

// Ensure environments folder exists
const envDir = './src/environments';
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
  console.log(`📁 Created missing folder: ${envDir}`);
}

// Write environment.ts
const envOutputPath = path.join(envDir, 'environment.ts');
const envContent = `export const environment = {
  production: false,
  API_URL: '${process.env.API_URL || ''}',
  KEYCLOAK_URL: '${process.env.KEYCLOAK_URL || ''}',
};
`;

fs.writeFileSync(envOutputPath, envContent);
console.log(`✅ Environment file created at: ${envOutputPath}`);
