// Filename: api-routes.js

// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to AddressHub crafted with love!'
    });
});

// Import address controller
var addressController = require('./addressController');

// address routes
router.route('/addresses')
    .get(addressController.index)
    .post(addressController.new);
    
router.route('/addresses/:address_id')
    .get(addressController.view)
    .put(addressController.update)
    .delete(addressController.delete);

// Export API routes
module.exports = router;