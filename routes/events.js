const express = require('express');
const router = express.Router();

const dbFunctions = require('../database/mongo');
const { findAllData, findData, insertData, updateData, deleteData } = dbFunctions;

const dbName = 'appDB';
const collectionName = 'events';

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await findAllData(dbName, collectionName);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an event
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await findData(dbName, collectionName, id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an event
router.post('/', async (req, res) => {
  const { event } = req.body;

  try {
    const insertedEvent = await await insertData(dbName, collectionName, event);
    res.json(insertedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an event
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { event } = req.body;

  try {
    const updatedEvent = await updateData(dbName, collectionName, id, event);
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await deleteData(dbName, collectionName, id);
    res.json(deletedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;