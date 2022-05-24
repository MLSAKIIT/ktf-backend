import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
    res.send("login");
})

export default router