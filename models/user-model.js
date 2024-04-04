const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, trim: true, /*unique*/},
    email: {type: String, required: true, match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ /*unique*/},
    thoughts: [Thought],
    friends: [User]
})

userSchema.virtual('friendCount').get(() => {
    return friends.length
})

const User = mongoose.model('User', userSchema)

module.exports = User