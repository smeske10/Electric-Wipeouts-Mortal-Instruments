const User = require('./User');
const Product = require('./Product');
const Category = require('./Category')

User.hasMany(Product, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Product.belongsToMany(User,{
  foreignKey:'user_id'
})

Product.belongsTo(Category,{
  foreignKey:'category_id'
})

Category.hasMany(Product,{
  foreignKey:'category_id'
})

module.exports = { User, Product, Category };
