const router = require("express").Router();
const { response } = require("express");
const { Sequelize } = require("sequelize");
const { Cart } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
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
