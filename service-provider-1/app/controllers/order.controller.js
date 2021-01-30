const Order = require('../models/order.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    //TODO better validation
    if(!req.body.catalogItemId) {
        return res.status(400).send({
            message: "order content can not be empty"
        });
    }

    // Create an order
    const order = new Order({
        catalogItemId: req.body.catalogItemId,
        orderStatus: req.body.orderStatus,
        costCenter: req.body.costCenter,
        customerId: req.body.customerId,
        user: req.body.user,
        bu: req.body.bu,
        params: req.body.params,
    });

    // Save order in the database
    order.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the order."
        });
    });
};

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
    Order.find()
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
};

// Find a single order with a orderId
exports.findOne = (req, res) => {
    Order.findById(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });            
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving order with id " + req.params.orderId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    //TODO better validation
    if(!req.body.description) {
        return res.status(400).send({
            message: "order description can not be empty"
        });
    }

    // Find note and update it with the request body
    Order.findByIdAndUpdate(req.params.orderId, {
        catalogItemId: req.body.catalogItemId,
        orderStatus: req.body.orderStatus,
        costCenter: req.body.costCenter,
        customerId: req.body.customerId,
        user: req.body.user,
        bu: req.body.bu,
        params: req.body.params,
    }, {new: true})
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.orderId
            });
        }
        res.send(order);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "catalogItem not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Error updating catalogItem with id " + req.params.orderId
        });
    });
};

// Delete a catalogItem with the specified catalogItemId in the request
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
    .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });
        }
        res.send({message: "order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "order not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Could not delete order with id " + req.params.orderId
        });
    });
};