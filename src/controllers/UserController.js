const knex = require("../database");
const uploadToDrive = require("../config/uploadGoogleDriver");
const { hash, compare } = require("bcrypt");

const appError = require("../utils/appError");

class UserController {

    async register(req, res) {

        let {
            name,
            email,
            password,
        } = req.body;

        console.log("chegui aqui na requisição");

        password = await hash(password, 7);

        try {

            await knex("users").insert({
                name,
                email,
                password
            });

        } catch (error) {

            res.status(400).json({
                message: "INTERNAL ERROR SERVER"
            })
        }

        res.status(200).json();
    };

    async updateUser(req, res) {

        const { id } = req.user;

        let {
            currentPassword,
            newPassword,
        } = req.body;

        const user = await knex("users").where({ id }).first();

        if (!user) throw new appError(400, "Usúario não encontrado");

        const passwordIsEquals = await compare(currentPassword, user.password);

        if (!passwordIsEquals) throw new appError(403, "Senha antiga não confere!");

        newPassword = await hash(newPassword, 7);

        await knex("users").update({ password: newPassword }).where({ id });

        res.status(200).json();
    };

    async deleteUser(req, res) {

        const { id } = req.params;

        try {
            await knex("users").del().where({ id });

        } catch (error) {
            throw new appError(400, "não foi possivel excluir usúario");
        }

        return res.status(200).json();


    };

    async getAvatar(req, res) {
        const { id } = req.user;

       

        const { imagem } = await knex("users").where({id}).first();

    

        res.status(200).json(imagem)
    }

    async updateAvatar(req, res) {

        const { id } = req.user;
     

        const uploadedFile = req.file;


        const fileBuffer = uploadedFile.buffer;
        const fileName = uploadedFile.originalname;

        const ID_IMAGEM_GOOGLE_DRIVE = await uploadToDrive(fileBuffer, fileName);

        await knex("users").update({
            imagem: ID_IMAGEM_GOOGLE_DRIVE
        }).where({id});

        res.status(200).json();

    }

};

module.exports = UserController;