const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const controller = new AuthController;

const authRoutes = Router();

authRoutes.post("/signln", controller.signln);
authRoutes.post("/signup", controller.signup);

module.exports = authRoutes;