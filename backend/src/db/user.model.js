const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})

module.exports = model('user', userSchema)