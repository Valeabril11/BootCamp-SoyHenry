var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{
    res.send('Hola!, estoy en ....')
})

router.get('/valeria', (req, res)=>{
    res.send('valeria')
})

router.get('/:id', (req, res)=>{
    res.send(req.params.id)
})

module.exports = router;