const { Product, Category } = require('../models');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: Category });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Товар не найден' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, categoryId } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Путь к изображению
    const product = await Product.create({ name, price, description, categoryId, image });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: Изменение товара по ID (с изображением)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const { name, price, description, categoryId } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : product.image; // Новое изображение или старое
      await product.update({ name, price, description, categoryId, image });
      res.json(product);
    } else {
      res.status(404).json({ error: 'Товар не найден' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.json({ message: 'Товар удалён' });
    } else {
      res.status(404).json({ error: 'Товар не найден' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };