const mongoose = require('mongoose');
const dict = require('./dictionary.json');
let schemas = {};
let schema = mongoose.Schema;

schemas.userSchema = () => {
    let userschema = new schema(dict.user)
    return userschema;
}



module.exports = schemas;