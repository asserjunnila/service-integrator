const mongoose = require('mongoose');

const catalogItemSchema = mongoose.Schema({
    catalogItemName: String,
    category: String,
    catalogItemId: String,
    description: String,
    bu: String,
    price: Number,
    discount: Number,
    imgUrl: String,
    params: String,
}, {
    timestamps: true
});


module.exports = mongoose.model('CatalogItem', catalogItemSchema);