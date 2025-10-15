const express = require('express');
const app = express();
const port = 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Массив для хранения товаров (в памяти)
let products = [
  { id: 1, name: 'Товар 1', price: 100, description: 'Описание 1' },
  { id: 2, name: 'Товар 2', price: 200, description: 'Описание 2' }
];

// GET: Список всех товаров в JSON
app.get('/products', (req, res) => {
  res.json(products);
});

// GET: Товар по ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Товар не найден' });
  }
});

// POST: Добавление товара
app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1, // Автоинкремент ID
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT: Изменение товара по ID
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ error: 'Товар не найден' });
  }
});

// DELETE: Удаление товара по ID
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    const deleted = products.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Товар не найден' });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});