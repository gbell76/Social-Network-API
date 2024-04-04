const mongoose = require('mongoose')
const {thoughtSchema} = require('./thought-model')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, trim: true, unique: true},
    email: {type: String, required: true, unique: true, match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/},
    thoughts: [thoughtSchema],
    friends: [mongoose.ObjectId]
})

userSchema.virtual('friendCount').get(() => {
    return friends.length
})

const User = mongoose.model('User', userSchema)

module.exports = User