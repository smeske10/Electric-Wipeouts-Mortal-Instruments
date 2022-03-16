const router = require("express").Router();
const { response } = require("express");
const { Sequelize } = require("sequelize");
const { Cart } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log("in cart routes");
  let p_id = parseInt(req.body["prod_id"]);
  let u_id = req.session.user_id;

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

router.delete("/delete/:id", async (req, res) => {
  let pId = req.params.id;
  let uId = req.session.user_id;
  try {
    // const findCart = await Cart.findOne({ where: { user_id: uId, product_id: pId }});
    // console.log(findCart)
    const cart = await Cart.destroy({
      where: {
        user_id: uId,
        product_id: pId,
      },
    });

    if (!cart) {
      res.status(404).json({ message: "No item found!" });
      return;
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
