const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();

//const password = 'YrZNgAr9MMjqot5L';
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://dbUser:${password}@atlascluster.cavlzpk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function findAllData(dbName, collectionName) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const results = await collection.find().toArray();

    return results;
  } catch (err) {
    console.error('Error getting documents:', err);
    return null;
  } finally {
    await client.close();
  }
}

async function findData(dbName, collectionName, documentId) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.findOne({ _id: new ObjectId(documentId) });

    return result;
  } catch (err) {
    console.error('Error getting document:', err);
    return null;
  } finally {
    await client.close();
  }
}

async function insertData(dbName, collectionName, doc) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(doc);

    return result;
  } catch (err) {
    console.error('Error inserting document:', err);
    return null;
  } finally {
    await client.close();
  }
}

async function updateData(dbName, collectionName, documentId, doc) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.updateOne(
      { _id: new ObjectId(documentId) },
      { $set: doc }
    );

    return result;
  } catch (err) {
    console.error('Error updating document:', err);
    return null;
  } finally {
    await client.close();
  }
}

async function deleteData(dbName, collectionName, documentId) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.deleteOne({ _id: new ObjectId(documentId) });

    return result;
  } catch (err) {
    console.error('Error deleting document:', err);
    return null;
  } finally {
    await client.close();
  }
}

module.exports = { findAllData, findData, insertData, updateData, deleteData };