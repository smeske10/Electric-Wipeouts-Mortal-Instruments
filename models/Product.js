const {Model, DataTypes } = require('sequelize');
const sequelize= require('../config/connection');

class Product extends Model {}

Product.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
        },
        name: {
            type:DataTypes.STRING,
            allowNull:false,
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        stock:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        category_id:{
            type: DataTypes.INTEGER,
            references:{
                model:'category',
                key:'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
    }
);

module.exports = Product;