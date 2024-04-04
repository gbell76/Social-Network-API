const mongoose = require('mongoose')
const dayjs = require('dayjs')

const reactionSchema = mongoose.Schema({
    reactionId: {type: mongoose.ObjectId, default: new mongoose.Types.ObjectId},
    reactionBody: {type: String, required: true, maxLength: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now(), get: (date) => {
        return dayjs(date, 'MMM-DD-YYYY hh:mm')
    }}
})

const thoughtSchema = mongoose.Schema({
    thoughtText: {type: String, required: true, maxLength: 280, minLength: 1},
    createdAt: {type: Date, default: Date.now(), get: (date) => {
        return dayjs(date, 'MMM-DD-YYYY hh:mm')
    }},
    username: {type: String, required: true},
    reactions: [reactionSchema]
})

thoughtSchema.virtual('reactionCount').get(() => {
    return reactions.length
})

const Thought = mongoose.model('Thought', thoughtSchema)

module.exports = {Thought, thoughtSchema}