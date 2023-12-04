const { Router } = require("express");
const TagController = require("../controllers/TagController");

const controller = new TagController();

const tagRoutes = Router();

tagRoutes.get("/:note_id", controller.getAllTags);
tagRoutes.post("/", controller.createTag);
tagRoutes.put("/:id_tag", controller.updateTag);
tagRoutes.delete("/:id_tag", controller.deleteTag);


module.exports = tagRoutes;