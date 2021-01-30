const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    catalogItemId: String,
    orderStatus: Number,
    costCenter: String,
    customerId: String,
    user: String,
    bu: String,
    params: String,
}, {
    timestamps: true
});


module.exports = mongoose.model('Order', orderSchema);