module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    'CartItem',
    {
      quantity: {
        type: DataTypes.INTEGER,
      },
    },
    { underscored: true }
  );

  CartItem.associate = (db) => {
    CartItem.belongsTo(db.Product, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    }),
      CartItem.belongsTo(db.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      });
  };

  return CartItem;
};
