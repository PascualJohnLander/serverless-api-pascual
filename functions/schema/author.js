const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventoryItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    reorderPoint: {
        type: Number,
        required: true,
    },
});

inventoryItemSchema.pre('save', function(next) {
    // No need for pre-processing before saving inventory items
    next();
});

module.exports = inventoryItemSchema;
