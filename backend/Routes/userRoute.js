import express from "express";
const router = express.Router();
import { getUser, Login, Logout, Register } from "../Controllers/userController.js";
import { isAuthentication } from "../Middlewares/IsAuthenticated.js";

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").post(Logout);
router.route("/check").get(isAuthentication);
router.route("/auth").get(isAuthentication);

router.route("/getuser").get(isAuthentication,getUser);

export default router;
