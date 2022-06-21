import { Order } from "@models";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const {
    // currentUser: { uid },
  } = req.body;

  const uid = "sA200grZCqblEkvY4wkmI8xIqn32";

  const allOrders = await Order.find({ uid });

  let orderItems: any = [];
  allOrders.map((order) => {
    orderItems.push(...order.items);
  });

  res.status(200).json(orderItems);
});

export default router;
