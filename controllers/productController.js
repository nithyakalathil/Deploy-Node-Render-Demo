const Product = require("../model/Product");
const createProduct = async (req, res) => {
try {
const product = new Product({
name: req.body.name,
price: req.body.price,
category: req.body.category,
description: req.body.description
});
const savedProduct = await product.save();
res.status(201).json({
message: "Product created successfully",
product: savedProduct
});
} catch (error) {
res.status(500).json({
message: "Error creating product",
error: error.message
});
}
};

const getProducts = async (req, res) => {
    try {
const products = await Product.find();
res.status(200).json(products);
} catch (error) {
res.status(500).json({
message: "Error getting products",
error: error.message
});
}
};

const getProductById = async (req, res) => {
try {
const product = await Product.findById(req.params.id);
if (!product) {
    return res.status(404).json({
message: "Product not found"
});
}

res.status(200).json(product);
} catch (error) {

res.status(500).json({
message: "Error getting product",
error: error.message
});
}
};

const updateProduct = async (req, res) => {
try {
const updatedProduct =await Product.findByIdAndUpdate(
req.params.id,
req.body,
{new: true,}
);
if (!updatedProduct) {

return res.status(404).json({
message: "Product not found"
});
}
res.status(200).json({
message: "Product updated successfully",
product: updatedProduct
});
} catch (error) {
res.status(500).json({
message: "Error updating product",
error: error.message
});
}
};

const deleteProduct = async (req, res) => {
try {
const deletedProduct =await Product.findByIdAndDelete(req.params.id);
if (!deletedProduct) {
return res.status(404).json({
message: "Product not found"
});
}
res.status(200).json({
message: "Product deleted successfully",
product: deletedProduct
});

} catch (error) {+
res.status(500).json({
message: "Error deleting product",
error: error.message
});
}
};

module.exports = {
createProduct,
getProducts,
getProductById,
updateProduct,
deleteProduct
};