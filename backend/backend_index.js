import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';

// Initialize Firebase Admin
import serviceAccount from './serviceAccount.json' with { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(bodyParser.json());

const collectionName = 'customers';

// Create user
app.post('/add', async (req, res) => {
  const { first_name, last_name, user_id, age } = req.body;

  if (!first_name || !last_name || !user_id || !age) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const userRef = db.collection(collectionName).doc(user_id);
    await userRef.set({ first_name, last_name, user_id, age });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
app.get('/', async (req, res) => {
  try {
    const usersSnapshot = await db.collection(collectionName).get();
    const users = usersSnapshot.docs.map((doc) => doc.data());
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user by user_id
app.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const userRef = db.collection(collectionName).doc(user_id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user
app.put('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { first_name, last_name, age } = req.body;

  try {
    const userRef = db.collection(collectionName).doc(user_id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedData = {
      ...(first_name && { first_name }),
      ...(last_name && { last_name }),
      ...(age && { age }),
    };

    await userRef.update(updatedData);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user
app.delete('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const userRef = db.collection(collectionName).doc(user_id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    await userRef.delete();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));