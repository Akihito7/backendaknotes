const knex = require("../database");
const appError = require("../utils/appError");
const { hash,compare } = require("bcrypt");
const tokenGenerator = require("../utils/tokenGenerator");

class AuthController {

    async signln(req, res) {

        const { email, password } = req.body;

        const user = await knex("users").where({ email }).first();

        if (!user) throw new appError(400, "Usúario não encontrado");

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) throw new appError(400, "e-mail e/ou senha incorretos");

        const token = await tokenGenerator(user.id);

        return res.status(200).json({user, token});

    };

    async signup(req, res) {

        let { name, email, password } = req.body;

        const nameAlreadyExists = await knex("users").where({ name }).first();

        if (nameAlreadyExists) throw new appError(401, "Nome já em uso, tente outro!");

        const emailAlreadyExists = await knex("users").where({ email }).first();

        if (emailAlreadyExists) throw new appError(401, "E-mail já em uso, tente outro!");
    
        password = await hash(password, 7);

        await knex("users").insert({name,email,password});

        return res.status(200).json();

    }
};

module.exports = AuthController;