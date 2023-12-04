const { Router } = require("express");
const LinkController = require("../controllers/LinkController");
const controller = new LinkController();


const linkRoutes = Router();

linkRoutes.get("/:note_id", controller.getAllLinks);
linkRoutes.post("/", controller.createLink);
linkRoutes.put("/:id_link", controller.updateLink);
linkRoutes.delete("/:id_link", controller.deleteLink);

module.exports = linkRoutes;