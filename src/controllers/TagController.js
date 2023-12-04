const knex = require("../database");
const appError = require("../utils/appError");

class TagController {

    async getAllTags(req, res) {

        const { note_id } = req.params;

        const tags = await knex("tags").where({ note_id });

        return res.status(200).json(tags);

    };

    async createTag(req, res) {
        const { name, note_id } = req.body;

        await knex("tags").insert({
            name, note_id
        });

        return res.status(200).json();
    };

    async updateTag(req, res) {

        const { id_tag } = req.params;
        let { name } = req.body;

        const tag = await knex("tags").where({ id: id_tag });

        if (!tag) throw new appError(404, "tag não encontrada, tente novamente");

        name = name ? name : tag.name;

        await knex("tags").update({ name }).where({ id: id_tag });

        return res.status(200).json();

    };

    async deleteTag(req, res) {

        const { id_tag } = req.params;

        await knex("tags").del().where({ id: id_tag });

        return res.status(200).json();
    };
};


module.exports = TagController;