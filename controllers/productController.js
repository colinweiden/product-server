const { Product, Category } = require('../models');

// GET: Список всех товаров (с категориями)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: Товар по ID (с категорией)
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

// POST: Добавление товара
const createProduct = async (req, res) => {
  try {
    const { name, price, description, categoryId } = req.body;
    const product = await Product.create({ name, price, description, categoryId });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: Изменение товара по ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body);
      res.json(product);
    } else {
      res.status(404).json({ error: 'Товар не найден' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: Удаление товара по ID
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