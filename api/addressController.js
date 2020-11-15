Address = require("./addressModel");
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
            message: "Addresses retrieved successfully",
            data: addresses
        });
    });
};

// Handle create address actions
exports.new = function (req, res) {
    const address = new Address();
    const postal_code = req.body.postal_code;
    const street = req.body.street;
    const block = req.body.block;
    const unit = req.body.unit;
    
    if (!postal_code || !street || !block) {
        return res.status(500).send("Required fields cannot be blank");
    }
    if (!(/^\d+$/.test(postal_code))) {
        return res.status(500).send("Postal code must be a number");
    }

    address.postal_code = postal_code;
    address.street = street;
    address.block = block;
    address.unit = unit;

// save the address and check for other errors
    address.save(function (err) {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({
            message: "New address created!",
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
            message: "Address details loading..",
            data: address
        });
    });
};

// Handle update address info
exports.update = function (req, res) {
    Address.findById(req.params.address_id, function (err, address) {
        const postal_code = req.body.postal_code;
        const street = req.body.street;
        const block = req.body.block;
        const unit = req.body.unit;
        
        if (!postal_code || !street || !block) {
            return res.status(500).send("Required fields cannot be blank");
        }
        if (!(/^\d+$/.test(postal_code))) {
            return res.status(500).send("Postal code must be a number");
        }
    
        address.postal_code = postal_code;
        address.street = street;
        address.block = block;
        address.unit = unit;
    
        // save the address and check for other errors
        address.save(function (err) {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({
                message: "Address Info updated",
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
            message: "Address deleted"
        });
    });
};