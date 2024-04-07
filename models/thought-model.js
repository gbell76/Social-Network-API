const mongoose = require('mongoose')

const reactionSchema = mongoose.Schema({
    reactionId: {type: mongoose.ObjectId, default: new mongoose.Types.ObjectId},
    reactionBody: {type: String, required: true, maxLength: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now(), get: (date) => {
        return date.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) + ' ' + date.toLocaleTimeString('en-us', {hour12: true})
    }}
}, {toJSON: {getters: true}})

const thoughtSchema = mongoose.Schema({
    thoughtText: {type: String, required: true, maxLength: 280, minLength: 1},
    createdAt: {type: Date, default: Date.now(), get: (date) => {
        return date.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})+ ' ' + date.toLocaleTimeString('en-us', {hour12: true})
    }},
    username: {type: String, required: true},
    reactions: [reactionSchema]
}, {toJSON: {virtuals: true, getters: true}})

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = mongoose.model('Thought', thoughtSchema)

module.exports = {Thought, thoughtSchema}