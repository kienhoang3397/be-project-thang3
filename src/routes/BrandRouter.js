const express = require("express");
const router = express.Router()
const BrandController = require('../controllers/BrandController');


router.post('/create', BrandController.createBrand)
router.get('/getall', BrandController.getAllBrand)


module.exports = router