const Asset = require('../models/asset.model.js');

exports.create = (req, res) => {
    // Validate request
    // TODO: rest of the fields
    if(!req.body.catalogItemName || !req.body.instanceId || !req.body.owner 
        || !req.body.user || !req.body.params) {
        return res.status(400).send({
            message: "missing info"
        });
    }

    const asset = new Asset({
        catalogItemName: req.body.catalogItemName,
        catalogId: req.body.catalogId,
        instanceId: req.body.instanceId,
        owner: req.body.owner,
        user: req.body.user,
        bu: req.body.bu,
        params: req.body.params,
    });

    asset.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the asset. Try again"
        });
    });
};

exports.findAll = (req, res) => {
    Asset.find()
    .then(assets => {
        res.send(assets);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving assets."
        });
    });
};

exports.findOne = (req, res) => {
    Asset.findById(req.params.assetId)
    .then(asset => {
        if(!asset) {
            return res.status(404).send({
                message: "asset not found with id " + req.params.assetId
            });            
        }
        res.send(asset);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "asset not found with id " + req.params.assetId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving asset with id " + req.params.assetId
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.description || !req.body.catalogItemName || !req.body.instanceId || !req.body.owner 
        || !req.body.user || !req.body.params) {
        return res.status(400).send({
            message: "needed asset info can not be empty"
        });
    }

    Asset.findByIdAndUpdate(req.params.assetId, {
        catalogItemName: req.body.catalogItemName,
        catalogId: req.body.catalogId,
        instanceId: req.body.instanceId,
        owner: req.body.owner,
        user: req.body.user,
        bu: req.body.bu,
        params: req.body.params,
    }, {new: true})
    .then(asset => {
        if(!asset) {
            return res.status(404).send({
                message: "asset not found with id " + req.params.assetId
            });
        }
        res.send(asset);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "asset not found with id " + req.params.assetId
            });                
        }
        return res.status(500).send({
            message: "Error updating asset with id " + req.params.assetId
        });
    });
};

exports.delete = (req, res) => {
    Asset.findByIdAndRemove(req.params.assetId)
    .then(asset => {
        if(!asset) {
            return res.status(404).send({
                message: "asset not found with id " + req.params.assetId
            });
        }
        res.send({message: "asset deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "asset not found with id " + req.params.assetId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.assetId
        });
    });
};