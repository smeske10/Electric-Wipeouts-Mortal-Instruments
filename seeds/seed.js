const sequelize = require('../config/connection');
const { User, Product, Category } = require('../models');

const userData = require('./userData.json');
const productData = require('./productData.json');
const categoryData = require('/categoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Product.bulkCreate(productData, {
    individualHooks: true,
    returning: true,
  });

  await Category.bulkCreate(categoryData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
