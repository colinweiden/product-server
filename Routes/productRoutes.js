const express = require('express');
const router = express.Router();
const multer = require('multer'); // Импорт Multer
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Настройка Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка для сохранения файлов
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Уникальное имя: timestamp-оригинальное_имя
  }
});
const upload = multer({ storage });

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', upload.single('image'), createProduct); // Загрузка одного файла 'image'
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
const { auth, adminOnly } = require('../middleware/auth');

router.get('/products', getAllProducts);                    // все могут видеть
router.get('/products/:id', getProductById);                // все

router.post('/products', auth, adminOnly, upload.single('image'), createProduct);
router.put('/products/:id', auth, adminOnly, upload.single('image'), updateProduct);
router.delete('/products/:id', auth, adminOnly, deleteProduct);