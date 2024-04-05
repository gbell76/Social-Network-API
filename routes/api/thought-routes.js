const router = require('express').Router()
const { Thought, User } = require('../../models')

router.get('/', async(req, res) => {
    try{
      const result = await Thought.find({});
      res.status(200).json(result);
    }catch(err){
      res.status(500).json(err);
    }
});

router.get('/:id', async(req, res) => {
    try{
        const result = await Thought.find({_id: req.params.id})
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/', async(req, res) => {
    try{
        const newThought = new Thought({thoughtText: req.body.thoughtText, username: req.body.username})
        newThought.save()
        const updatedUser = await User.findOneAndUpdate({_id: req.body.userId}, {$push: {thoughts: newThought._id}})
        res.status(200).json(newThought)
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const result = await Thought.findOneAndDelete({_id: req.params.id})
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id', async(req, res) => {
    try{
        const result = await Thought.findOneAndUpdate({_id: req.params.id}, req.body)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/:thoughtId/reactions', async(req, res) => {
    try{
        const updatedThought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$push: {reactions: req.body}})
        res.status(200).json(updatedThought)
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:thoughtId/reactions/:reactionId', async(req, res) => {
    try{
        const updatedThought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: req.params.reactionId}}})
        res.status(200).json(updatedThought)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router