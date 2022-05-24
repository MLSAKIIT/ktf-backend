import { Router } from 'express';
import register from './register';
import login from './login';
import data from './data';

const router = Router();

router.use("/register", register);
router.use("/login", login);
router.use("/data", data);

export default router;