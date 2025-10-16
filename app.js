const express = require('express');
const app = express();
const port = 3000;
const productRoutes = require('./Routes/productRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const { sequelize } = require('./models');
const path = require('path');

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', productRoutes);
app.use('/', categoryRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Подключение к БД успешно');
    app.listen(port, () => {
      console.log(`Сервер запущен на http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Ошибка подключения к БД:', err));
  const authRoutes = require('./routes/authRoutes');

// ... после других use ...
app.use('/auth', authRoutes);