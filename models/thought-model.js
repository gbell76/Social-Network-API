const mongoose = require('mongoose')

const reactionSchema = mongoose.Schema({
    reactionId: {type: ObjectId, default: new ObjectId},
    reactionBody: {type: String, required: true, maxLength: 280},
    username: {type: String, required: true},
    createdAt: {type: Date, default: Date.now() /* use getter to format on query*/}
})

const thoughtSchema = mongoose.Schema({
    thoughtText: {type: String, required: true, maxLength: 280, minLength: 1},
    createdAt: {type: Date, default: Date.now() /*use getter to format on query*/},
    username: {type: String, required: true},
    reactions: [reactionSchema]
})

thoughtSchema.virtual('reactionCount').get(() => {
    return reactions.length
})

const Thought = mongoose.model('Thought', thoughtSchema)

module.exports = Thought