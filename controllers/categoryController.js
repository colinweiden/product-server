const { Category, Product } = require('../models');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Product });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: Product });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Категория не найдена' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const category = await Category.create({ name, image });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      const { name } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : category.image;
      await category.update({ name, image });
      res.json(category);
    } else {
      res.status(404).json({ error: 'Категория не найдена' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.destroy();
      res.json({ message: 'Категория удалена' });
    } else {
      res.status(404).json({ error: 'Категория не найдена' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };