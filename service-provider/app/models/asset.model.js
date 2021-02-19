const mongoose = require('mongoose');

const assetSchema = mongoose.Schema({
    catalogItemName: String,
    catalogItemId: String,
    instanceId: String,
    owner: String,
    user: String,
    bu: String,
    params: String,
}, {
    timestamps: true
});


module.exports = mongoose.model('Asset', assetSchema);