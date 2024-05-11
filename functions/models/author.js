const mongoose = require('mongoose');
const inventorySchema = require('../schema/inventory'); 

const InventoryModel = mongoose.model('Inventory', inventorySchema);

module.exports = InventoryModel; 
