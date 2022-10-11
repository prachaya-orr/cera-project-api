// const db = require('./models/index');
// db.sequelize.sync({ alter: true });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const notFound = require('./middlewares/notFound');
const error = require('./middlewares/error');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);
app.use('/admin',adminRoute);
app.use('/users/cart', cartRoute);
// app.use('/users', userRoute);
app.use('/shop', productRoute);


app.use(notFound);
app.use(error);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port: ${port}`));
