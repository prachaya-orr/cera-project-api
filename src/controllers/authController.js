const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const { User } = require('../models');

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private_key', {
    expiresIn: process.env.JWT_EXPIRES || '7d',
  });

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!email) {
      throw new AppError('email is required', 400);
    }

    if (!password) {
      throw new AppError('password is required', 400);
    }

    if (password !== confirmPassword) {
      throw new AppError('password and confirm password did not match', 400);
    }

    const isEmail = validator.isEmail(email + '');

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email: isEmail ? email : null,
      password: hashedPassword,
    });

    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};
