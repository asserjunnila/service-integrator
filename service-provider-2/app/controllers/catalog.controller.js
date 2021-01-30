const CatalogItem = require('../models/catalogitem.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    //TODO better validation
    if(!req.body.description) {
        return res.status(400).send({
            message: "catalogItem content can not be empty"
        });
    }

    // Create a catalogItem
    const catalogItem = new CatalogItem({
        catalogItemName: req.body.catalogItemName,
        category: req.body.category,
        catalogItemId: req.body.catalogItemId,
        description: req.body.description,
        bu: req.body.bu,
        price: req.body.price,
        discount: req.body.discount,
        imgUrl: req.body.imgUrl,
        params: req.body.params,
    });

    // Save catalogItem in the database
    catalogItem.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the catalogItem."
        });
    });
};

// Retrieve and return all catalogItems from the database.
exports.findAll = (req, res) => {
    CatalogItem.find()
    .then(catalogItems => {
        res.send(catalogItems);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving catalogItems."
        });
    });
};

// Find a single catalogItem with a catalogItemId
exports.findOne = (req, res) => {
    Product.findById(req.params.catalogItemId)
    .then(catalogItem => {
        if(!catalogItem) {
            return res.status(404).send({
                message: "catalogItem not found with id " + req.params.catalogItemId
            });            
        }
        res.send(catalogItem);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "catalogItem not found with id " + req.params.catalogItemId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving catalogItem with id " + req.params.catalogItemId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    //TODO better validation
    if(!req.body.description) {
        return res.status(400).send({
            message: "catalogItem description can not be empty"
        });
    }

    // Find note and update it with the request body
    CatalogItem.findByIdAndUpdate(req.params.catalogItemId, {
        catalogItemName: req.body.catalogItemName,
        category: req.body.category,
        catalogItemId: req.body.catalogItemId,
        description: req.body.description,
        bu: req.body.bu,
        price: req.body.price,
        discount: req.body.discount,
        imgUrl: req.body.imgUrl,
        params: req.body.params,
    }, {new: true})
    .then(catalogItem => {
        if(!catalogItem) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.catalogItemId
            });
        }
        res.send(catalogItem);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "catalogItem not found with id " + req.params.catalogItemId
            });                
        }
        return res.status(500).send({
            message: "Error updating catalogItem with id " + req.params.catalogItemId
        });
    });
};

// Delete a catalogItem with the specified catalogItemId in the request
exports.delete = (req, res) => {
    CatalogItem.findByIdAndRemove(req.params.catalogItemId)
    .then(catalogItem => {
        if(!catalogItem) {
            return res.status(404).send({
                message: "catalogItem not found with id " + req.params.catalogItemId
            });
        }
        res.send({message: "catalogItem deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "catalogItem not found with id " + req.params.catalogItemId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.catalogItemId
        });
    });
};