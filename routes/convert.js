const express = require('express');
const router = express.Router();

const downloadFunctions = require('../utils/download');
const { downloadFile } = downloadFunctions;

router.post('/', async (req, res) => {
  const { fileType, remotePath } = req.body;

  try {
    const result = await downloadFile(fileType, remotePath);
    res.json(result);
  } catch (error) {
    console.error('Error converting file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;