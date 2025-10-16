const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // Файл БД в корне
});

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
});

// Связь один-ко-многим: Category -> Products
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Синхронизация БД (создаст таблицы при запуске)
sequelize.sync({ force: true }) // force: true для теста (пересоздаёт таблицы)
  .then(() => console.log('База данных синхронизирована'))
  .catch(err => console.error('Ошибка синхронизации:', err));

module.exports = { sequelize, Product, Category };
sequelize.sync({ force: true }).then(async () => {
  const cat1 = await Category.create({ name: 'Электроника' });
  const cat2 = await Category.create({ name: 'Книги' });
  await Product.create({ name: 'Товар 1', price: 100, description: 'Описание 1', categoryId: cat1.id });
  await Product.create({ name: 'Товар 2', price: 200, description: 'Описание 2', categoryId: cat2.id });
});