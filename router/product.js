// const express=require("express")
// const router=express.Router()
// console.log("hiiiiii")
// router.post('/pro', (req, res) => {
//     console.log("hellllo")
//     console.log("POST /product received");
// console.log(req.body);
// res.send("Product received");
// });
// module.exports = router;

const express = require('express');
const router = express.Router();
const authenticate =require("../middleware/authMiddleware");
const authorize =require("../middleware/authorize");
const {
createProduct,
getProducts,
getProductById,
updateProduct,
deleteProduct
} = require('../controllers/productController');
router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id',getProductById);
router.put('/:id',updateProduct);

router.delete("/:id",authenticate,authorize("admin"),deleteProduct)
module.exports = router;