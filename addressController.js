Address = require('./addressModel');
// Handle index actions
exports.index = function (req, res) {
    Address.get(function (err, addresses) {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Address retrieved successfully",
            data: addresses
        });
    });
};

// Handle create address actions
exports.new = function (req, res) {
    var address = new Address();
    address.postal_code = req.body.postal_code ? req.body.postal_code : address.postal_code;
    address.street = req.body.street;
    address.block = req.body.block;
    address.unit = req.body.unit;
// save the address and check for errors
    address.save(function (err) {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({
            message: 'New address created!',
            data: address
        });
    });
};

// Handle view address info
exports.view = function (req, res) {
    Address.findById(req.params.address_id, function (err, address) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({
            message: 'Address details loading..',
            data: address
        });
    });
};

// Handle update address info
exports.update = function (req, res) {
Address.findById(req.params.address_id, function (err, address) {
        if (err) {
            return res.status(500).send(err);
        }
        address.postal_code = req.body.postal_code ? req.body.postal_code : address.postal_code;
        address.street = req.body.street;
        address.block = req.body.block;
        address.unit = req.body.unit;
        // save the address and check for errors
        address.save(function (err) {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({
                message: 'Address Info updated',
                data: address
            });
        });
    });
};

// Handle delete address
exports.delete = function (req, res) {
    Address.deleteOne({
        _id: req.params.address_id
    }, function (err, address) {
        if (err) {
            return res.status(500).send(err);            
        }
        res.json({
            status: "success",
            message: 'Address deleted'
        });
    });
};