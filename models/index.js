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

// Синхронизация БД и добавление начальных данных
sequelize.sync({ force: true }).then(async () => {
  // Создание категорий
  const soda = await Category.create({ name: 'Газированные напитки' });
  const juice = await Category.create({ name: 'Соки' });

  // Создание 5 товаров (соков и напитков)
  await Product.create({ name: 'Pepsi', price: 80, description: 'Газированный напиток Pepsi, 0.5л', categoryId: soda.id });
  await Product.create({ name: 'Sprite', price: 75, description: 'Газированный напиток Sprite, 0.5л', categoryId: soda.id });
  await Product.create({ name: 'Fanta', price: 78, description: 'Газированный напиток Fanta, 0.5л', categoryId: soda.id });
  await Product.create({ name: 'Яблочный сок', price: 90, description: 'Натуральный яблочный сок, 1л', categoryId: juice.id });
  await Product.create({ name: 'Апельсиновый сок', price: 95, description: 'Натуральный апельсиновый сок, 1л', categoryId: juice.id });

  console.log('База данных синхронизирована, добавлено 5 товаров');
}).catch(err => console.error('Ошибка синхронизации:', err));

module.exports = { sequelize, Product, Category };