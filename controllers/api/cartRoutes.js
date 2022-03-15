const router = require("express").Router();
const { response } = require("express");
const { Sequelize } = require("sequelize");
const { Cart } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log("in cart routes");
  let p_id = parseInt(req.body["prod_id"]);
  let u_id = req.session.user_id;
  console.log(u_id);
  console.log(p_id);

  try {
    const newCart = await Cart.create({
      user_id: u_id,
      product_id: p_id,
    });
    res.status(201).json(newCart);
  } catch (err) {
    const updatedCart = await Cart.update(
      {
        quantity: Sequelize.literal(`quantity + 1`),
      },
      {
        where: {
          user_id: u_id,
          product_id: p_id,
        },
      }
    );
    res.status(204).json(updatedCart);
  }
  // in the try block
  // Try do the create
  // This is the happy pathy
  // You already have the code for this

  // in the catch block
  // You can check the error
  // to see if nothing was inserted

  // if nothing was inserted
  // make a update where the 2 ids match

  // if the error wasn't because something was inserted
  // than do normal error handling

  // try {
  //   // if ((p_id = Cart.product_id && u_id == Cart.user_id)) {
  //   let updatedCart = await Cart.upsert(
  //     {
  //       user_id: u_id,
  //       product_id: p_id,
  //     },
  //     {
  //       quantity,
  //     }
  //   );
  //   res.status(200).json(updatedCart);
  //   // } else {

  //   // res.status(200).json(newCart);
  //   // }

  //   res.status(200).json(newCart);
  // } catch (err) {
  //   res.status(400).json(err);
  // }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const products = await Product.findByPk(req.params.id);
//     const product = products.get({ plain: true });

//     res.status(200).json(product);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const newProduct = await Product.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newProduct);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const product = await Product.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!product) {
//       res.status(404).json({ message: "No project found with this id!" });
//       return;
//     }

//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
