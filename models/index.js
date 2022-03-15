const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");
const Cart = require('./Cart')


// Product.belongsTo(Category, {
//   foreignKey: 'category_id'
// })
// Category.hasMany(Product, {
//   foreignKey: 'category_id',
//   onDelete:'CASCADE'
// });

// Product.belongsToMany(User, {
//   through: {
//     model: Cart,
//     unique:false
//   },
//   as: 'user-cart'
// });

// User.belongsToMany(Product, {
//   through:{
//     model: Cart, 
//     unique:false
//   },
//   as: 'cart-products'
// });





User.belongsToMany(Product, {through:Cart});
Product.belongsToMany(User,{through:Cart})
User.hasMany(Cart)
Cart.belongsTo(User);
Product.hasMany(Cart);
Cart.belongsTo(Product)


Product.belongsTo(Category);

Category.hasMany(Product, {
  foreignKey: "category_id",
});

// Product.belongsTo(User, {
//   through: "User_Products",
// });


// User.hasOne(Cart)

// Cart.belongsTo(User)

// Cart.belongsToMany(Product)
///////////


module.exports = { User, Product, Category, Cart };
