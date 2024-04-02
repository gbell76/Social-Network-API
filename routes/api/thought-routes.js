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

router.post('/', (req, res) => {
    try{
        const newThought = new Thought({thoughtText: req.body.thoughtText, username: req.body.username, userId: req.body.userId})
        newThought.save()
        //push to user thoughtIds array
        res.status(200).json(newThought)
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const result = await findOneAndDelete({_id: req.params.id})
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

router.post('/:thoughtId/reactions', async(req, res) => {

})

router.delete('/:thoughtId/reactions', async(req, res) => {
    
})

module.exports = router