const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-2025';

// === ETHREAL 100% РАБОЧИЙ ===
let transporter;
(async () => {
  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
  console.log("Ethereal готов! Письма тут: https://ethereal.email");
})();

const register = async (req, res) => { /* твой старый код регистрации */ };
const login = async (req, res) => { /* твой старый код логина */ };

// Восстановление пароля
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email обязателен' });

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(200).json({ message: 'Если email существует — письмо отправлено' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 15 * 60 * 1000;

    user.resetToken = token;
    user.resetTokenExpires = expires;
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

    const info = await transporter.sendMail({
      from: '"Product Server" <no-reply@product-server.local>',
      to: email,
      subject: 'Восстановление пароля',
      html: `
        <h2>Сброс пароля</h2>
        <p>Ссылка действительна 15 минут:</p>
        <a href="${resetUrl}" style="padding:10px 20px; background:#007bff; color:white; text-decoration:none;">
          Сбросить пароль
        </a>
        <p>Или токен: <code>${token}</code></p>
      `
    });

    console.log("РАБОЧАЯ ССЫЛКА НА ПИСЬМО →", nodemailer.getTestMessageUrl(info));
    res.json({ message: 'Письмо отправлено' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// Сброс пароля
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ error: 'Токен и пароль обязательны' });

    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpires: { [require('sequelize').Op.gt]: Date.now() }
      }
    });

    if (!user) return res.status(400).json({ error: 'Токен недействителен или истёк' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    res.json({ message: 'Пароль успешно изменён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, forgotPassword, resetPassword };