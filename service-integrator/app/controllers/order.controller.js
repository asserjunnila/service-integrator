const fetch = require('node-fetch');

const serviceproviders = require('../../config/serviceproviders')


exports.create = (req, res) => {
    
    let url = ""
    switch(req.body.bu) {
        case serviceproviders[0].bu:
            url = serviceproviders[0].url+'order/'
            break
        case serviceproviders[1].bu:
            url = serviceproviders[1].url+'order/'
            break
        default: 
            res.send("something went wrong")
    }
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => res.send(json))
    
};

//returns all products from the two service providers
exports.findAll = (req, res) => {
    Promise.all(serviceproviders.map(serviceprovider =>
        fetch(serviceprovider.url + 'order/').then(resp => resp.json())
    )).then(data => res.send([].concat(...data)))
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving assets."
        });
    });
};


/*
// Find a single note with a assetId
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

// Delete an asset with the specified noteId in the request
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