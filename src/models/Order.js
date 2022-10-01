const { PAYMENT_SUCCESS } = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
        status: {
            type: DataTypes.ENUM(PAYMENT_SUCCESS, PAYMENT_PENDING),
            allowNull: false,
            defaultValue: PAYMENT_PENDING
          },
          invoiceDate: {
            type: DataTypes.DATEONLY
          },
    },
    { underscored: true }
  );
  return User;
};
