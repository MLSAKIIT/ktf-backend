import { newAmount, verifyCoupon } from "@utils";
import { Router } from "express";
import { User, Event, Merch } from "@models";

const router = Router();

router.post("/", async (req, res) => {
  const {
    currentUser: { uid },
    eventID,
    merchID,
    merchSize = "M",
    quantity = 1,
  } = req.body;

  if (!eventID && !merchID) {
    return res.status(400).send({
      message: "Please provide event or merch ID",
    });
  }

  let event;
  let merch;
  let newEvent;
  let newMerch;
  const user = await User.findOne({ uid }, "cart -_id");

  const { cart: { items = [], couponApplied = false, coupon = null } = {}, eventRegistered = [] } =
    user;

  // If event is provided
  if (eventID) {
    event = await Event.findOne({ eventID });
    if (!event) {
      return res.status(500).send({
        message: "Invalid EventID",
      });
    }
    eventRegistered.map((event: any) => {
      if (event.eventID === eventID) {
        return res.status(500).send({
          message: "You have already registered for this event",
        });
      }
    });
    const { name, eventDate, price, imageUrl } = event;
    newEvent = {
      name,
      eventDate,
      price,
      imageUrl,
      type: "event",
      id: parseInt(eventID, 10),
      addedOn: new Date(),
    };
    let alreadyInCart = false;
    items.map((item: any) => {
      if (item.id === eventID) {
        alreadyInCart = true;
      }
    });
    if (alreadyInCart) {
      return res.status(400).send({
        message: "Event already in the cart",
      });
    }

    const newItems = [...(items || []), newEvent];

    const newCart = {
      couponApplied,
      amount: await newAmount(newItems, couponApplied, coupon),
      items: newItems,
    };

    await User.findOneAndUpdate(
      { uid },
      {
        $set: {
          cart: newCart,
        },
      },
    );
    return res.json({
      message: "Event added to cart",
    });
  }

  // If merch is provided
  if (merchID) {
    // if(!merchSize) {
    //   return res.status(400).send({
    //     message: "Please provide merch size",
    //   });
    // }
    // if(!quantity){
    //   return res.status(400).send({
    //     message: "Please provide quantity",
    //   });
    // }
    merch = await Merch.findOne({ merchID });
    if (!merch) {
      return res.status(500).send({
        message: "Invalid merchID",
      });
    }
    const { name, price, imageUrl } = merch;
    newMerch = {
      name,
      price,
      imageUrl,
      type: "merch",
      id: parseInt(merchID, 10),
      added_on: new Date(),
      merchSize,
      quantity,
    };
    let alreadyInCart = false;
    // let itemInIndex = 0;

    items.map((item: any, i: number) => {
      if (item.id === merchID) {
        alreadyInCart = true;
        // itemInIndex = i;
      }
    });

    let newItems = [];
    // if (!alreadyInCart) {
    newItems = [...(items || []), newMerch];
    // } else {
    //   newItems = [...items];
    //   newItems[itemInIndex].quantity = quantity;
    // }
    if (alreadyInCart) {
      return res.status(400).send({
        message: "Merch already in the cart",
      });
    }

    let newAmount: number = newItems.reduce((acc, item) => {
      return item.type === "event" ? acc + item.price : acc + item.price * item.quantity;
    }, 0);

    if (couponApplied && coupon) {
      newAmount = parseInt((newAmount * (await verifyCoupon(coupon)).discount).toFixed(0));
    }

    const newCart = {
      couponApplied,
      amount: newAmount,
      items: newItems,
    };

    await User.findOneAndUpdate(
      { uid },
      {
        $set: {
          cart: newCart,
        },
      },
    );
    return res.json({
      message: "Merch added to cart",
    });
  }
});

export default router;
