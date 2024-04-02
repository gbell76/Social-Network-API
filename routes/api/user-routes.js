const router = require('express').Router()
const { User } = require('../../models')

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
        const newUser = new User({username: req.body.username, password: req.body.password})
        newUser.save()
        res.status(200).json(newUser)
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const result = await findOneAndDelete({_id: req.params.id})
        //delete thoughts
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id', async(req, res) => {
    try{
        const result = await findOneAndUpdate({_id: req.params.id}, req.body)
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/:id/friends/:friendId', async(req, res) => {

})

router.delete('/:id/friends/:friendsId', async(req, res) => {
    
})

module.exports = router