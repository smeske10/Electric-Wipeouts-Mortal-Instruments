const router = require("express").Router();
const { response } = require("express");
const { Sequelize } = require("sequelize");
const { Cart, Product } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  let p_id = parseInt(req.body["prod_id"]);
  let u_id = req.session.user_id;

  try {
    const newCart = await Cart.create({
      user_id: u_id,
      product_id: p_id,
    });
    await Product.update(
      {
        stock: Sequelize.literal(`stock - 1`),
      },
      {
        where: {
          id: p_id,
        },
      }
    );
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
    await Product.update(
      {
        stock: Sequelize.literal(`stock - 1`),
      },
      {
        where: {
          id: p_id,
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
    const findCart = await Cart.findOne({ where: { user_id: uId, product_id: pId }});
    console.log(findCart.quantity)
    if(findCart.quantity>1){
      let cartSub= await Cart.update(
        {
          quantity: Sequelize.literal(`quantity - 1`),
        },
        {
          where: {
            user_id: uId,
            product_id: pId,
          },
        }
      )
      await Product.update(
        {
          stock: Sequelize.literal(`stock + 1`),
        },
        {
          where: {
            id: pId,
          },
        }
      );
      if (!cartSub) {
        res.status(404).json({ message: "No item found!" });
        return;
      }
      res.status(200).json(cartSub);
      return
    }else{
      console.log("in delete else block")
      const cart = await Cart.destroy({
        where: {
          user_id: uId,
          product_id: pId,
        },
      })
      await Product.update(
        {
          stock: Sequelize.literal(`stock + 1`),
        },
        {
          where: {
            id: pId,
          },
        }
      );
      if (!cart) {
        res.status(404).json({ message: "No item found!" });
        return;
      }
      res.status(200).json(cart);
      return
    }
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
