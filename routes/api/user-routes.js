const router = require('express').Router()
const { User, Thought } = require('../../models')

router.get('/', async(req, res) => {
    try{
      const result = await User.find({});
      res.status(200).json(result);
    }catch(err){
      res.status(500).json(err);
    }
});

router.get('/:id', async(req, res) => {
    try{
        const result = await User.find({_id: req.params.id})
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/', (req, res) => {
    try{
        const newUser = new User({username: req.body.username, email: req.body.email})
        newUser.save()
        res.status(200).json(newUser)
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const result = await User.findOneAndDelete({_id: req.params.id})
        const thoughtResults = await Thought.deleteMany({username: result.username})
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id', async(req, res) => {
    try{
        const result = await User.findOneAndUpdate({_id: req.params.id}, req.body)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/:id/friends/:friendId', async(req, res) => {
    try{
        const updatedUser = await User.findOneAndUpdate({_id: req.params.id}, {$push: {friends: req.params.friendId}})
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:id/friends/:friendsId', async(req, res) => {
    try{
        const updatedUser = await User.findOneAndUpdate({_id: req.params.id}, {$pull: {friends: req.params.friendsId}})
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router