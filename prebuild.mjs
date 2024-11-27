import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const CONFIG = {
  schemaUrl: 'https://raw.githubusercontent.com/gfargo/vercel-doorman/main/schema/firewall-config.schema.json',
  retryAttempts: 3,
  retryDelay: 1000, // ms
  timeout: 10000, // ms
};

// Convert URL to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function logSuccess(message) {
  console.log('\x1b[32m✓\x1b[0m', message);
}

function logError(message) {
  console.error('\x1b[31m❌\x1b[0m', message);
}

function logInfo(message) {
  console.log('\x1b[36mℹ\x1b[0m', message);
}

function ensureDirectoryExists(filePath) {
  const directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    logInfo(`Created directory: ${directory}`);
  }
}

function validateSchema(data) {
  try {
    const schema = JSON.parse(data);
    if (!schema || typeof schema !== 'object') {
      throw new Error('Invalid schema format');
    }
    return true;
  } catch (error) {
    throw new Error(`Schema validation failed: ${error.message}`);
  }
}

async function downloadSchema(url, outputPath, attempt = 1) {
  logInfo(`Downloading schema from: ${url}`);
  
  return /** @type {Promise<void>} */(new Promise((resolve, reject) => {
    const tempPath = `${outputPath}.temp`;
    const fileStream = fs.createWriteStream(tempPath);
    let data = '';

    const request = https.get(url, { timeout: CONFIG.timeout }, (response) => {
      const { statusCode, headers } = response;

      if (statusCode !== 200) {
        fileStream.close();
        fs.unlinkSync(tempPath);
        
        if (statusCode === 404) {
          reject(new Error('Schema not found (404)'));
        } else if (statusCode >= 500 && attempt < CONFIG.retryAttempts) {
          logInfo(`Received ${statusCode}, retrying (${attempt}/${CONFIG.retryAttempts})...`);
          setTimeout(() => {
            downloadSchema(url, outputPath, attempt + 1)
              .then(resolve)
              .catch(reject);
          }, CONFIG.retryDelay);
          return;
        } else {
          reject(new Error(`HTTP Error: ${statusCode}`));
        }
        return;
      }

      logInfo(`Content length: ${headers['content-length'] || 'unknown'} bytes`);

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        
        try {
          validateSchema(data);
          fs.renameSync(tempPath, outputPath);
          logSuccess(`Schema downloaded successfully to: ${outputPath}`);
          resolve();
        } catch (error) {
          fs.unlinkSync(tempPath);
          reject(error);
        }
      });
    });

    request.on('timeout', () => {
      request.destroy();
      fileStream.close();
      fs.unlinkSync(tempPath);
      
      if (attempt < CONFIG.retryAttempts) {
        logInfo(`Request timed out, retrying (${attempt}/${CONFIG.retryAttempts})...`);
        setTimeout(() => {
          downloadSchema(url, outputPath, attempt + 1)
            .then(resolve)
            .catch(reject);
        }, CONFIG.retryDelay);
      } else {
        reject(new Error('Request timed out'));
      }
    });

    request.on('error', (error) => {
      fileStream.close();
      fs.unlinkSync(tempPath);
      
      if (attempt < CONFIG.retryAttempts) {
        logInfo(`Network error, retrying (${attempt}/${CONFIG.retryAttempts})...`);
        setTimeout(() => {
          downloadSchema(url, outputPath, attempt + 1)
            .then(resolve)
            .catch(reject);
        }, CONFIG.retryDelay);
      } else {
        reject(error);
      }
    });

    fileStream.on('error', (error) => {
      fileStream.close();
      fs.unlinkSync(tempPath);
      reject(new Error(`File write error: ${error.message}`));
    });
  }));
}

async function main() {
  const outputPath = path.join(__dirname, 'public', 'schema.json');
  
  try {
    console.log('\n\x1b[1m📥 Schema Downloader\x1b[0m\n');
    
    ensureDirectoryExists(outputPath);
    
    await downloadSchema(CONFIG.schemaUrl, outputPath);
    
    console.log('\n\x1b[32m✨ Prebuild completed successfully!\x1b[0m\n');
  } catch (error) {
    logError(`Failed to download schema: ${error.message}`);
    if (error.stack) {
      console.error('\x1b[90m' + error.stack.split('\n').slice(1).join('\n') + '\x1b[0m');
    }
    process.exit(1);
  }
}

// Execute the script
main().catch((error) => {
  logError('Unexpected error:', error);
  process.exit(1);
});