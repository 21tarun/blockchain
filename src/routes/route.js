const express =require('express')
const router=express.Router()
const controller =require('../controllers/controller')



router.get('/assets',controller.assets)







module.exports=router