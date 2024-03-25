import express from 'express';
import { getAllGroceries, addGrocery, deleteGrocery, updateGrocery } from '../services/groceries.services';
import GroceryItem from '../models/grocery';

const router = express.Router();

router.get('/getAll', async (req, res) => {
  const name = req.query.name as string || '';
  const category = req.query.category as string || '';
  const groceries = await getAllGroceries(name, category);
  res.json(groceries);
});

router.post('/saveNewItem', async (req, res) => {
  const newGrocery = req.body as GroceryItem;
  try {
    const createdGrocery = await addGrocery(newGrocery);
    res.status(201).json(createdGrocery);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to create grocery item');
  }
});

router.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
      await deleteGrocery(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to delete grocery item');
    }
  });
  
  router.put('/update/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updates = req.body as Partial<GroceryItem>;
    try {
      const updatedGrocery = await updateGrocery(id, updates);
      res.status(200).json(updatedGrocery);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to update grocery item');
    }
  });

export default router;
