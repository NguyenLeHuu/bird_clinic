"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "cateid" });
      // Product.belongsTo(models.Collection, { foreignKey: "idcollection" });
      Product.hasMany(models.OrderDetail, { foreignKey: "productid" });
      Product.hasMany(models.Image, { foreignKey: "productid" });
    }
  }
  Product.init(
    {
      productid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      status: DataTypes.STRING,
      cateid: DataTypes.INTEGER,
      detail: DataTypes.STRING,
      mainimg: DataTypes.STRING,
      salerid: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
