"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.Saler, { foreignKey: "salerid" });
      Category.hasMany(models.Product, { foreignKey: "cateid" });
    }
  }
  Category.init(
    {
      cateid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      catename: DataTypes.STRING,
      salerid: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
