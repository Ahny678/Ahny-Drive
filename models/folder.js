const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./user");

class Folder extends Model {}

Folder.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        isUUID: 4,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "Folder",
  }
);

//one to many -> user -- folders
Folder.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    type: DataTypes.UUID,
  },
});

User.hasMany(Folder, {
  foreignKey: "userId",
});

module.exports = Folder;
