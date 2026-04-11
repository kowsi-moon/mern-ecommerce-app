const Product = require('../models/Product');

// 1. Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// 3. Add product
exports.addProduct = async (req, res) => {
  try {
    // isBestSeller-ah destructure pannanum
    const { name, price, category, stock, imageUrl, description, isBestSeller } = req.body;
    
    const newProduct = new Product({
      name,
      price,
      category,
      stock,
      imageUrl,
      description,
      isBestSeller: isBestSeller || false // Indha line dhaan mukkiyam
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: "Error saving to DB", error: err.message });
  }
};

// 4. Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // isBestSeller-ah req.body-la irundhu edukanum
    const { name, price, category, stock, imageUrl, description, isBestSeller } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { 
        name, 
        price, 
        category, 
        stock, 
        imageUrl, 
        description,
        isBestSeller // Indha field add panna dhaan DB-la maarum
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: "Error updating product", error: err.message });
  }
};

// 5. Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting product", error: err.message });
  }
};