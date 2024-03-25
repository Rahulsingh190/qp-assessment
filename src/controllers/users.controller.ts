import express from 'express';
import { createUser, getUserByUsername } from '../services/users.service';

const router = express.Router();

router.post('/createUser', async (req, res) => {
  const { username } = req.body;
  try {
    const newUser = await createUser(username);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).send('Failed to create user');
  }
});

router.get('/getUser/:username', async (req, res) => {
  const username = req.params.username;
  const user = await getUserByUsername(username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

export default router;
