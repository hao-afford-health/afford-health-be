const path = require('path');
const fs = require('fs');
const https = require('https');

const unstructuredFunctions = require('./unstructured');
const { structureFile } = unstructuredFunctions;

const openAIFunctions = require('./openai');
const { structureData } = openAIFunctions;

const downloadFile = async (fileType, remotePath) => {
  const fileName = path.basename(remotePath);

  const localPath = path.join('files', fileName.slice(fileName.lastIndexOf('%2F') + 3, fileName.indexOf('?')));

  const file = fs.createWriteStream(localPath);

  try {
    await new Promise((resolve, reject) => {
      https.get(remotePath, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`File ${localPath} downloaded`);
            resolve();
          });
        });
      }).on('error', (err) => {
        reject(err);
      });
    });

    const elements = await structureFile(remotePath, localPath, false);

    console.log('Structured Elements:', elements);

    const concatenatedText = elements.map(element => element.text).join(' ');

    const output = await structureData(fileType, concatenatedText);

    console.log('Structured Output:', output.output);

    await fs.promises.unlink(localPath);
    
    console.log(`File ${localPath} deleted.`);

    return output.output;
  } catch (error) {
    console.error('Error converting file:', error.message);

    await fs.promises.unlink(localPath);
    
    console.log(`File ${localPath} deleted due to an error.`);
  }
}

module.exports = { downloadFile };