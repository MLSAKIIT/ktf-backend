import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  // const {
  //   cart: cartString,
  //   currentUser: { uid },
  // } = req.body;
  // if (!cartString) {
  //   return res.status(400).send({
  //     message: "No cart Items found",
  //   });
  // }
  // const cart = JSON.parse(cartString)

  // cart.items.map(async (item: any) => {

  // })

  res.status(200).send({
    message: "Items added to cart",
  });
});

export default router;
