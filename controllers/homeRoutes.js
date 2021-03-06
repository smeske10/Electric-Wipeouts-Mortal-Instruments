const router = require("express").Router();
const { send } = require("express/lib/response");
const { Product, Category, User, Cart, PaymentAPI } = require("../models");
const { beforeDestroy } = require("../models/User");
const sendToServer = require("../public/js/payment/merchant-server");
const withAuth = require("../utils/auth");
const nodeMail = require("../utils/nodemailer");

//homepage products
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["name"],
        },
      ],
    });
    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );
    res.render("homepage", {
      categories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/cart", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Product }],
    });
    const cartData = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        { model: Cart, attributes: ["quantity"] },
      ],
    });
    const user = userData.get({ plain: true });

    const products = cartData.map((product) => product.get({ plain: true }));
    console.log(products);
    res.render("cart", {
      products,
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/checkout", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });
    const cartData = await Product.findAll();

    const user = userData.get({ plain: true });

    const products = cartData.map((product) => product.get({ plain: true }));

    res.render("check-out", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/confirm", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Product }],
    });
    const cartData = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });

    const user = userData.get({ plain: true });

    const products = cartData.map((product) => product.get({ plain: true }));
    nodeMail(user, products);

    // send();
    // sendToServer(body);
    res.render("confirm", {
      products,
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post("/payment", async (req, res) => {
  try {
    const paymentData = await PaymentAPI.create({
      body,
    });

    res.status(200).json(paymentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//sort by category
router.get("/category/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "name"],
        },
      ],
    });

    const category = categoryData.get({ plain: true });

    res.render("category", {
      ...category,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const products = await Product.findByPk(req.params.id);
    const product = products.get({ plain: true });

    res.render("product", {
      product,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/cart");
    return;
  }
  res.render("login");
});

module.exports = router;
