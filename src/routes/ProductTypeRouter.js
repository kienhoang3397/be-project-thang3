const express = require("express");
const router = express.Router()
const ProductTypeController = require('../controllers/ProductTypeController');


router.post('/create', ProductTypeController.createProductType)
router.get('/getall', ProductTypeController.getAllCategories)


module.exports = router