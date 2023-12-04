const knex = require("../database");
const appError = require("../utils/appError");

class LinkController {

    async getAllLinks(req, res) {

        const { note_id } = req.params;

        const links = await knex("links").where({ note_id });

        return res.status(200).json(links);
    };

    async createLink(req, res) {

        const { url, note_id } = req.body;

        await knex("links").insert({
            url,
            note_id
        });

        return res.status(200).json()

    };

    async updateLink(req, res) {

        const { id_link } = req.params;
        const { url } = req.body;

        const link = await knex("links").where({id: id_link}); 

        if (!link) throw new appError(404, "não foi possivel encontrar esse link");

        await knex("links").update({ url }).where({ id: id_link });

        return res.status(200).json();
    };

    async deleteLink(req, res) {

        const { id_link } = req.params;

        await knex("links").del().where({ id : id_link });

        return res.status(200).json();
    };
};

module.exports = LinkController;