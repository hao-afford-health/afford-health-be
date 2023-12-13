const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

require('dotenv').config();

const apiUrl = 'https://api.unstructured.io/general/v0/general';
//const apiKey = 'sYRNkyY7QMBXzJaMivddqFExbsuo43';
const apiKey = process.env.UNSTRUCTURED_API_KEY;
const ocrLanguages = 'eng';
const strategy = 'hi_res';
const inferTableStructure = 'true';
const skipInferTableTypes = '[]';

const structureFile = async (remotePath, localPath, hasTable) => {
  const formData = new FormData();
  formData.append('files', fs.createReadStream(localPath));
  formData.append('ocr_languages', ocrLanguages);

  if (hasTable) {
    formData.append('strategy', strategy);

    if (remotePath.includes('.pdf')) {
      formData.append('pdf_infer_table_structure', inferTableStructure);
    } else {
      formData.append('skip_infer_table_types', skipInferTableTypes);
    }
  }

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': `multipart/form-data;`,
        'unstructured-api-key': apiKey,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error accessing unstructured:', error.response ? error.response.data : error.message);
  }
}

module.exports = { structureFile };
