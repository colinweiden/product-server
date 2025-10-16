const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { auth, adminOnly } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', auth, adminOnly, upload.single('image'), createCategory);
router.put('/categories/:id', auth, adminOnly, upload.single('image'), updateCategory);
router.delete('/categories/:id', auth, adminOnly, deleteCategory);

module.exports = router;