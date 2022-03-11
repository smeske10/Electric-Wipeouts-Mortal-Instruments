const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");

User.hasMany(Product, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Product.belongsToMany(User, {
  through: "User_Products",
});

Product.belongsTo(Category);

Category.hasMany(Product, {
  foreignKey: "category_id",
});

module.exports = { User, Product, Category };
