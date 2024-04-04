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
        const thoughtResults = await Thought.deleteMany({userId: req.params.id})
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
        const result = await User.find({_id: req.params.id})
        result.friends.push(req.params.friendId)
        const updatedUser = await User.findOneAndUpdate({_id: req.params.id}, result)
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:id/friends/:friendsId', async(req, res) => {
    try{
        const result = await User.find({_id: req.params.id})
        for(i in result.friends){
            if(result.friends[i] === req.params.friendsId){
                result.friends.splice(i, 1)
            }
        }
        const updatedUser = await User.findOneAndUpdate({_id: req.params.id}, result)
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router