module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      unitPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  Product.associate = (db) => {
    Product.hasMany(db.ProductImage, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT',
    }),

      Product.hasMany(db.ProductList, {
        foreignKey: {
          name: 'productId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
      });
  };

  return Product;
};
