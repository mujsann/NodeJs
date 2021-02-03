const express = require('express')
const router = express.Router()

const isUserAuthenticated = require('../Middlewares/authMiddleware').isUserAuthenticated 
const userUpdate = require('../services/users')


router.get('/', (req, res)=>{return res.json("route works")})

router.post('/:userId/verify', isUserAuthenticated, (req, res, next)=>{
    const {userId} = req.params
    console.log(userId)
    return userUpdate(userId)
    .then(user=>{res.json(user)})
    .catch(err=>res.json(err)) 
})

 
module.exports = router