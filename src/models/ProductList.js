module.exports = (sequelize, DataTypes) => {
  const ProductList = sequelize.define(
    'ProductList',
    {
      sizeValue: {
        type: DataTypes.ENUM('XS', 'S', 'M', 'L', 'XL'),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      colorValue: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      countStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true}
  );

  ProductList.associate = (db) => {
    ProductList.belongsTo(db.Product, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return ProductList;
};
