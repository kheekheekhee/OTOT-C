const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("user", userSchema)
module.exports = User

module.exports.get = (callback, limit) => {
    Contact.find(callback).limit(limit)
}
