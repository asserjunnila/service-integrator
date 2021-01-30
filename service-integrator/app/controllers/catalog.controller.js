const fetch = require('node-fetch');

const serviceproviders = require('../../config/serviceproviders')


/*
exports.create = (req, res) => {
    // Validate request
    if(!req.body.description) {
        return res.status(400).send({
            message: "product content can not be empty"
        });
    }
    // Create a Note
    const product = new Product({
        product: req.body.product || "Untitled Product", 
        id: req.body.id,
        description: req.body.description,
        bu: req.body.bu,
    });

    // Save Note in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    });
};
*/

    //returns all products from the two service providers
exports.findAll = (req, res) => {
    Promise.all(serviceproviders.map(serviceprovider =>
        fetch(serviceprovider.url + 'catalog/').then(resp => resp.json())
    )).then(data => res.send([].concat(...data)))
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving catalogs."
        });
    });
};

/*
// Find a single note with a noteId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.description) {
        return res.status(400).send({
            message: "product description can not be empty"
        });
    }

    // Find note and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        product: req.body.product || "Untitled product",
        id: req.body.id,
        description: req.body.description,
        bu: req.body.bu,
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.productId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });
        }
        res.send({message: "product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.productId
        });
    });
};
*/