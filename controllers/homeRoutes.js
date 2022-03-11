const router = require('express').Router();
const { Product, Category, User } = require('../models');
const withAuth = require('../utils/auth');

//homepage products
router.get('/', async (req, res) => {
    try {
      const productData = await Product.findAll();
      const products = productData.map((product)=>product.get({plain:true}))
      res.render('homepage',{
        products,
        logged_in:req.session.logged_in
      })
    }catch(err) {
    res.status(500).json(err);
  }
});

// to user profile page
router.get('/profile', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Project }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

//sort by category
  router.get('/category/:id', async (req, res) => {
    try {
      const productData = await Category.findByPk(req.params.id, {
        include: [
          {
            model: Product,
            attributes: ['id','name'],
          },
        ],
      });
  
      const category = categoryData.get({ plain: true });
  
      res.render('category', {
        ...category,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
