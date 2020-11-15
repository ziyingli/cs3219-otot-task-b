const mongoose = require('mongoose');
// Setup schema
const addressSchema = mongoose.Schema({
    postal_code: {
        type: Number,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    block: {
        type: String,
        required: true
    },
    unit: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Address model
const Address = module.exports = mongoose.model('address', addressSchema);
module.exports.get = function (callback, limit) {
    Address.find(callback).limit(limit);
}