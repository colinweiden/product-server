const express = require('express');
const app = express();
const port = 3000;
const productRoutes = require('./routes/productRoutes');
const { sequelize } = require('./models'); // Подключаем БД

app.use(express.json());

// Маршруты
app.use('/', productRoutes);

// Запуск сервера после подключения БД
sequelize.authenticate()
  .then(() => {
    console.log('Подключение к БД успешно');
    app.listen(port, () => {
      console.log(`Сервер запущен на http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Ошибка подключения к БД:', err));