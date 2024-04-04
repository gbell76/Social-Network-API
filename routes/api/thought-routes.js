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
        const newThought = new Thought({thoughtText: req.body.thoughtText, username: req.body.username, userId: req.body.userId})
        newThought.save()
        const user = await User.find({_id: req.body.userId})
        user.thoughts.push(newThought._id)
        const updatedUser = User.findOneAndUpdate({_id: req.body.userId}, user)
        res.status(200).json(updatedUser)
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
        const result = await Thought.find({_id: req.params.thoughtId})
        result.thoughts.push(req.body)
        const updatedThought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, result)
        res.status(200).json(updatedThought)
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:thoughtId/reactions', async(req, res) => {
    try{
        const result = await Thought.find({_id: req.params.thoughtId})
        for(i in result.reactions){
            if(result.reactions[i].reactionId === req.body.reactionId){
                result.reactions.splice(i, 1)
            }
        }
        const updatedThought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, result)
        res.status(200).json(updatedThought)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router