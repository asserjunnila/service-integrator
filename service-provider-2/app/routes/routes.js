module.exports = (app) => {

    // ASSET ROUTES
    const asset = require('../controllers/asset.controller.js');
    // Create a new asset
    app.post('/assets', asset.create);
    // Retrieve all assets
    app.get('/assets', asset.findAll);
    // Retrieve a single asset with assetId
    app.get('/assets/:assetId', asset.findOne);
    // Update an asset with assetId
    app.put('/assets/:assetId', asset.update);
    // Delete an asset with assetId
    app.delete('/assets/:assetId', asset.delete);


    // CATALOG ROUTES
    const catalog = require('../controllers/catalog.controller.js');
    // Create a new catalog item
    app.post('/catalog', catalog.create);
    // Retrieve all catalogItems
    app.get('/catalog', catalog.findAll);
    // Retrieve a single catalog item with catalogId
    app.get('/catalog/:catalogItemId', catalog.findOne);
    // Update an asset with assetId
    app.put('/catalog/:catalogItemId', catalog.update);
    // Delete an asset with assetId
    app.delete('/catalog/:catalogItemId', catalog.delete);


    // ORDER ROUTES
    const order = require('../controllers/order.controller.js');
    // Create a new order item
    app.post('/order', order.create);
    // Retrieve all orders
    app.get('/order', order.findAll);
    // Retrieve a single order item with orderId
    app.get('/order/:orderId', order.findOne);
    // Update an order with orderId
    app.put('/order/:orderId', order.update);
    // Delete an order with orderId
    app.delete('/order/:orderId', order.delete);

}