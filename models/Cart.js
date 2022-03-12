const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cart extends Model { }

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
                unique: false
            },
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "product",
                key: "id",
                unique: false
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'cart',
    }
);

module.exports = Cart;