const express = require('express');
const router = express.Router();

const dbFunctions = require('../database/mongo');
const { findAllData, findData, insertData, updateData, deleteData } = dbFunctions;

const dbName = 'appDB';
const collectionName = 'files';

// Get all files
router.get('/', async (req, res) => {
  try {
    const files = await findAllData(dbName, collectionName);
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a file
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const file = await findData(dbName, collectionName, id);
    res.json(file);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a file
router.post('/', async (req, res) => {
  const { file } = req.body;

  try {
    const insertedFile = await await insertData(dbName, collectionName, file);
    res.json(insertedFile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a file
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { file } = req.body;

  try {
    const updatedFile = await updateData(dbName, collectionName, id, file);
    res.json(updatedFile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a file
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFile = await deleteData(dbName, collectionName, id);
    res.json(deletedFile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;