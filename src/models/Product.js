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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  //   Product.associate = (db) => {
  //     Product.hasMany(db.ProductImage),
  //       {
  //         foreignKey: {
  //           name: 'ProductId',
  //           allowNull: false,
  //         },
  //         onDelete: 'RESTRICT',
  //         onUpdate: 'RESTRICT',
  //       };
  //   };

  return Product;
};
