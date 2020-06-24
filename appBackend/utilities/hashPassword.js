require('dotenv').config()
const bcrypt = require('bcrypt');

const password = process.env.SECRET;
const email = process.env.EMAIL;
const role = 'admin';

let admin = {
    email: email,
    password: password,
    role: role
}


let hashThePassword = async () => {

    const passwordHashed = await bcrypt.hash(password, 10)
    return {
        email: admin.email,
        password: passwordHashed,
        role: admin.role
    }
}

module.exports = {
    hashThePassword
}