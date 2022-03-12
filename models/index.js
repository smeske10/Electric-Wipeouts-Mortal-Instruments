const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");
const Cart = require('./Cart')


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
