const router = require("express").Router();
const { Product } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    const mappedProducts = products.map((product) =>
      product.get({ plain: true })
    );
    res.render("product", {
      mappedProducts,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const products = await Product.findByPk(req.params.id);
    const product = products.get({ plain: true });

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
