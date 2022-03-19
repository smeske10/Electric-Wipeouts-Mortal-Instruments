const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class PaymentAPI extends Model {}

PaymentAPI.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shipping: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cvc: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "paymentapi",
  }
);

module.exports = PaymentAPI;
