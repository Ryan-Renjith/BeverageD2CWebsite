const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          quantity: {
            type: Number,
            required: true,
            default: 1
          }
        }
    ],

  totalAmount: { type: Number },
  orderDate: { type: String },
  fulfilmentDate: { type: String }, 
  mobileNo: { type: Number },
  address: { type: String },
  completedStatus: { type: Boolean }
});

module.exports = mongoose.model('Order', orderSchema);