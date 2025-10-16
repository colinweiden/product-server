const { DataTypes } = require('sequelize');
const { sequelize } = require('.');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'admin']]
    }
  },
  // === ПОЛЯ ДЛЯ ВОССТАНОВЛЕНИЯ ПАРОЛЯ ===
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetTokenExpires: {
    type: DataTypes.DATE,
    allowNull: true
  }
  // =====================================
}, {
  timestamps: true,
  tableName: 'Users'
});

module.exports = User;