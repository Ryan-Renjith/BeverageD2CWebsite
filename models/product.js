const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name cannot be empty']
    },

    price: {
        type: Number,
        required: [true, 'Price cannot be empty']
    },

    description: {
        type: String,
        required: [true, 'Product description cannot be empty']
    },

    image: {
        type: String,
        required: [true, 'Atleast 1 image required']
    },

    listingStatus: Boolean
});

module.exports = mongoose.model('Product', productSchema);