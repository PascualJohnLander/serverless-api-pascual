const mongoose = require('mongoose');
const authorSchema = require('../schema/author');

const InventoryModel = mongoose.model('Author', authorSchema);

module.exports = AuthorModel;