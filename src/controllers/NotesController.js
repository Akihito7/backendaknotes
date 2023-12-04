const knex = require("../database");
const appError = require("../utils/appError");

class NotesController {


    async getNotesWithLinksAndTagsByUserId(req, res) {

        const { user_id } = req.params;

        const ALLNOTESWITHTAGASANDLINKS = [];

        try {
            const notes = await knex('notas').where({ user_id });

            await Promise.all(
                notes.map(async (note) => {
                    const links = await knex('links').where({ note_id: note.id }).select('id', 'url');
                    const tags = await knex('tags').where({ note_id: note.id }).select('id', 'name');

                    ALLNOTESWITHTAGASANDLINKS.push({ note, links, tags });
                })
            );

            return res.status(200).json(ALLNOTESWITHTAGASANDLINKS);
        } catch (error) {
            throw new appError(400, error.message);
        }
    }

    async getNoteByIdWithLinksAndTags(req, res) {

        const { noteId } = req.params;

        try {
            const note = await knex('notas').where({ id: noteId }).first();

            if (!note) {
                throw new Error('Nota não encontrada');
            }

            const links = await knex('links').where({ note_id: noteId }).select('id', 'url');
            const tags = await knex('tags').where({ note_id: noteId }).select('id', 'name');

            return res.status(200).json({ note, links, tags });
        } catch (error) {
            throw new appError(400, error.message);
        }
    }

    async getAllNotes(req, res) {

        const { user_id } = req.params;

        const notes = await knex("notas").where({ user_id });

        return res.status(200).json(notes);
    };

    async getUniqueNote(req, res) {
        const { note_id } = req.params;

        const uniqueNote = await knex("notas").where({
            id: note_id
        }).first();

        return res.status(200).json(uniqueNote);
    };

    async createNotes(req, res) {
        console.log("cheguei aqui")

        const {
            user_id,
            name,
            description,
            links,
            tags,
        } = req.body;

        const [{ id }] = await knex("notas").insert({ user_id, name, description }).returning("id");

        console.log(id)


        try {
            links.map(async link => {
                await knex("links").insert({
                    url: link,
                    note_id : id
                });
            });

            tags.map(async tag => {
                await knex("tags").insert({
                    name: tag,
                    note_id : id
                });
            });


        } catch (error) {
            throw new appError("401", "Não foi possivel salvar a nota")
        }

        return res.status(200).json();

    };

    async updateNotes(req, res) {
        let { note_id, name, description } = req.body;

        const note = knex("notas").where({
            id: note_id
        });

        if (!note) throw new appError(404, "nota não encontrada, tente novamente");

        name = name ? name : note.name;
        description = description ? description : note.description;

        console.log("steep two");

        await knex("notas").update({ name, description }).where({
            id: note_id
        });

        return res.status(200).json();
    }

    async deleteNote(req, res) {
        
        const { note_id } = req.params;

        await knex("notas").del().where({
            id: note_id
        });

        return res.status(200).json();
    };
}

module.exports = NotesController;