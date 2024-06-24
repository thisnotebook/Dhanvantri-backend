const express = require('express');
const ProductController = require('../controller/products')
const router = express.Router();
router
.post('/', ProductController.createProduct)
.get('/', ProductController.getAllProduct)
.get('/:id', ProductController.getProduct)
.put('/:id',ProductController.updateProduct)
.delete('/:id', ProductController.deleteProduct)

exports.router = router;