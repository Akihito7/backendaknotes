const { Router } = require("express");
const NotesController = require("../controllers/NotesController");

const controller = new NotesController();

const ensureAuthentication = require("../middlewares/ensureAuthentication")

const notesRoutes = Router();


notesRoutes.use(ensureAuthentication);

notesRoutes.get("/:user_id", controller.getNotesWithLinksAndTagsByUserId);
notesRoutes.get("/unique-note/:noteId", controller.getNoteByIdWithLinksAndTags);
notesRoutes.post("/", controller.createNotes);
notesRoutes.put("/", controller.updateNotes);
notesRoutes.delete("/:note_id", controller.deleteNote);

module.exports = notesRoutes;