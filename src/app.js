// const db = require('./models/index');
// db.sequelize.sync({ alter: true });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const paymentRoute = require('./routes/paymentRoute');
const adminRoute = require('./routes/adminRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const orderItemRoute = require('./routes/orderItemRoute')
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
app.use('/admin', adminRoute);
app.use('/users', cartRoute);
app.use('/order', orderRoute);
app.use('/orderItem', orderItemRoute);
app.use('/payment', paymentRoute);
app.use('/shop', productRoute);

app.use(notFound);
app.use(error);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`\n\n\nserver running on port: ${port}`));
