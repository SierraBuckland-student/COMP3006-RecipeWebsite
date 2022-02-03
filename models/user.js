const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

//define schema object
var schemaDefiniton = {
    username: String,
    password: String,
    oauthId: String,
    oauthProvider: String,
    Created: Date
}

var userSchema = new mongoose.Schema(schemaDefiniton);
userSchema.plugin(plm);

//use mongoDb schema to create model and export it
module.exports = new mongoose.model('User', userSchema);