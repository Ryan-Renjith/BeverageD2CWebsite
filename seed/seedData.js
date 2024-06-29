const mongoose = require('mongoose');


// seedData = [
//     {
//       username: 'bvrgeadmin',
//       password: 'bvrgeadminpswd',
//     }
// ];



// seedData = [
//   {
//     name: 'Hilltop Nimbu Squash',
//     price: 120,
//     description: 'Organic and chemical-free 750ml lemon juice squash from Uttarakhand hills with a 12-month shelf life.',
//     image: '/images/Nimbu.jpeg'
//   },
  
//   {
//     name: 'Hilltop Buransh Squash',
//     price: 120,
//     description: 'Organic 750ml burash flower squash from Uttarakhand hills, chemical-free, 12-month shelf life.',
//     image: '/images/Buransh.jpeg'
//   },
  
//   {
//     name: 'Hilltop Orange Squash',
//     price: 120,
//     description: 'Organic 750ml fresh orange juice squash from Uttarakhand hills, chemical-free, 12-month shelf life.',
//     image: '/images/Orange.jpeg'
//   },
  
//   {
//     name: 'Hilltop Grapes Squash',
//     price: 120,
//     description: 'Organic 750ml fresh grape juice squash from Uttarakhand vineyards, chemical-free, 12-month shelf life.',
//     image: '/images/Grapes.jpeg'
//   },
  
//   {
//     name: 'Hilltop Mango Pickle',
//     price: 120,
//     description: 'A flavorful, spicy, and organic mustard oil-based pickle offering authentic taste and health benefits in every 500gm jar.',
//     image: '/images/MangoPickle.jpeg'
//   }
// ];


const seedData = {
  items: [
    {
      productId: new mongoose.Types.ObjectId('643a2c1b9c8d3f2b8c1e2f3d'),
      quantity: 2
    },
    {
      productId: new mongoose.Types.ObjectId('643a2c1b9c8d3f2b8c1e2f4e'),
      quantity: 1
    }
  ],
  totalAmount: 59.98,
  date: '29-04-2024',
  mobileNo: 1234567890,
  address: 'Bengaluru',
  completedStatus: false
};


module.exports = seedData;