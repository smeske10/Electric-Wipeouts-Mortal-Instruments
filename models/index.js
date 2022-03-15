const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");
const Cart = require("./Cart");

User.belongsToMany(Product, { through: Cart });
Product.belongsToMany(User, { through: Cart });
User.hasMany(Cart);
Cart.belongsTo(User);
Product.hasMany(Cart);
Cart.belongsTo(Product);

Product.belongsTo(Category);

Category.hasMany(Product, {
  foreignKey: "category_id",
});

module.exports = { User, Product, Category, Cart };
