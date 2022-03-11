const router = require("express").Router();
const { Product } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    const mappedProducts = products.map((product) =>
      product.get({ plain: true })
    );
    console.log(mappedProducts);
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

    console.log(product);
    res.status(200).json(product);
  } catch (err) {
    console.log("Are we here?");
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
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
