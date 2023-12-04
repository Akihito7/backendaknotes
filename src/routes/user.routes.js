const { Router } = require("express");
const UserController = require("../controllers/UserController");

const ensureAuthentication = require("../middlewares/ensureAuthentication");
const upload = require("../config/multer");

const controller =  new UserController();

const userRoutes = Router();

userRoutes.use(ensureAuthentication);

userRoutes.post("/register", controller.register);
userRoutes.put("/update/", controller.updateUser);
userRoutes.delete("/delete/:id", controller.deleteUser);

userRoutes.patch("/avatar", upload.single("avatar"), controller.updateAvatar);
userRoutes.get("/avatar", controller.getAvatar)

module.exports = userRoutes;