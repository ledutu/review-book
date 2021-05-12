const bcrypt = require('bcrypt');

function createHash (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

const Helpers = {
    createHash
}

module.exports = Helpers;