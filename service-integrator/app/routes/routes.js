module.exports = (app) => {
    const asset = require('../controllers/asset.controller.js');

    // Create a new asset
    //app.post('/assets', asset.create);

    // Retrieve all assets
    app.get('/assets', asset.findAll);

    // Retrieve a single asset with assetId
    //app.get('/assets/:assetId', asset.findOne);

    // Update a asset with assetId
    //app.put('/assets/:assetId', asset.update);

    // Delete a asset with assetId
    //app.delete('/assets/:assetId', asset.delete);



    //FEDERATED CATALOG ROUTING
    const catalog = require('../controllers/catalog.controller.js');

    // Create a new asset
    //app.post('/catalog', catalog.create);

    // Retrieve all assets
    app.get('/catalog', catalog.findAll);

    // Retrieve a single asset with assetId
    //app.get('/catalog/:catalogId', catalog.findOne);

    // Update a asset with assetId
    //app.put('/catalog/:catalogId', catalog.update);

    // Delete a asset with assetId
    //app.delete('/catalog/:catalogId', catalog.delete);


    //FEDERATED ORDER ROUTING
    const order = require('../controllers/order.controller.js');

    // Create a new asset
    app.post('/order', order.create);

    // Retrieve all assets
    app.get('/order', order.findAll);

    // Retrieve a single asset with assetId
    //app.get('/catalog/:catalogId', catalog.findOne);

    // Update a asset with assetId
    //app.put('/catalog/:catalogId', catalog.update);

    // Delete a asset with assetId
    //app.delete('/catalog/:catalogId', catalog.delete);

}