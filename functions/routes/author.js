const express = require('express');
const InventoryModel = require('../models/inventory'); // Assuming you have a model for inventory items

const router = express.Router();

// GET all inventory items
router.get('/', async (req, res) => {
    try {
        const inventory = await InventoryModel.find();
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single inventory item by ID
router.get('/:id', getInventoryItem, (req, res) => {
    res.json(res.inventoryItem);
});

// Create a new inventory item
router.post('/', async (req, res) => {
    try {
        const { name, quantity, reorderPoint } = req.body;
        if (!name || !quantity || !reorderPoint) {
            return res.status(400).json({ message: 'Name, quantity, and reorder point are required' });
        }
        
        const existingItem = await InventoryModel.findOne({ name });
        if (existingItem) {
            return res.status(400).json({ message: 'Item already exists' });
        }
        
        const newItem = new InventoryModel({ name, quantity, reorderPoint });
        const savedItem = await newItem.save();
        res.status(201).json({ message: 'Item created successfully', item: savedItem });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an existing inventory item
router.put('/:id', getInventoryItem, async (req, res) => {
    try {
        const updatedItem = await InventoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an inventory item
router.delete('/:id', getInventoryItem, async (req, res) => {
    try {
        await res.inventoryItem.deleteOne();
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a single inventory item by ID
async function getInventoryItem(req, res, next) {
    try {
        const inventoryItem = await InventoryModel.findById(req.params.id);
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.inventoryItem = inventoryItem;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = router;
