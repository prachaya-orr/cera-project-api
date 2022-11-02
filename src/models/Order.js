const { PAYMENT_SUCCESS, PAYMENT_PENDING } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      status: {
        type: DataTypes.ENUM(PAYMENT_SUCCESS, PAYMENT_PENDING),
        allowNull: false,
        defaultValue: PAYMENT_PENDING,
      },
    },
    { underscored: true }
  );

  Order.associate = (db) => {
    Order.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    }),
      Order.hasMany(db.OrderItem, {
        foreignKey: {
          name: 'orderId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      });
  };

  return Order;
};
