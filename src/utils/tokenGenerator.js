const { sign } = require('jsonwebtoken');
const { jwt } = require("../config/auth")

async function TokenGenerator(id_user){

    const { secret, expiresIn } = jwt;
    
    const token = sign({}, secret, {
        subject: String(id_user),
        expiresIn
      });
  
      return token;
};

module.exports = TokenGenerator;