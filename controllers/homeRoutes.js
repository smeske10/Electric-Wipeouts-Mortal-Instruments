const router = require("express").Router();
const { Product, Category, User } = require("../models");
const withAuth = require("../utils/auth");

//homepage products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{
        model: Product,
        attributes: ["name"],
      }]
    });
    const categories = categoryData.map((category) => category.get({ plain: true }))
    res.render('homepage', {
      categories,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/cart', withAuth, async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }]
    })
    const cartData = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const user = userData.get({ plain: true });
    console.log(user)
    
    const products = cartData.map((product) => product.get({ plain: true }));
    res.render('cart', {
      products,
      ...user,
      logged_in: true
    })
  } catch (err) {
    res.status(500).json(err);
  }
})


//sort by category
router.get('/category/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'name'],
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

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/cart');
    return;
  }
  res.render('login');
});


module.exports = router;
