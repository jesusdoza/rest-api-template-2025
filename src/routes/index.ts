import { Router } from "express";
const authRoutes = require("./auth");
const usersRoutes = require("./users");
const postsRoutes = require("./posts");
const { isAuth } = require("../middleware/authMiddleware");

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", isAuth, usersRoutes);
router.use("/posts", isAuth, postsRoutes);

export default router;
