"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Saler extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Saler.hasOne(models.Cart,{foreignKey:'SalerId'});
      // Saler.hasMany(models.Favorite,{foreignKey:'SalerId'});
      Saler.hasMany(models.Product, { foreignKey: "salerid" });
      // Saler.belongsTo(models.Agency, { foreignKey: "idagency" });
    }
  }
  Saler.init(
    {
      salerid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      image: DataTypes.STRING,
      address: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Saler",
      timestamps: false,
    }
  );
  return Saler;
};
