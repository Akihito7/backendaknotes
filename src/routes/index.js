const { Router } = require("express");
const routes = Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const notesRoutes = require("./notes.routes");
const linksRoutes = require("./link.routes");
const tagRoutes = require("./tag.routes");

routes.use("/auth", authRoutes);
routes.use("/user", userRoutes);
routes.use("/notes", notesRoutes);
routes.use("/link", linksRoutes);
routes.use("/tag", tagRoutes);

module.exports = routes;