const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Folder = require("./folder");
const User = require("./user");
class File extends Model {}

File.init(
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
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["video", "photo", "document"]],
      },
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "File",
  }
);

//one to many -> user -- files
File.belongsTo(Folder, {
  foreignKey: {
    name: "folderId",
    allowNull: true,
    type: DataTypes.UUID,
  },
  constraints: false,
});

Folder.hasMany(File, {
  foreignKey: "folderId",
});

//one to many -->user--files
File.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    type: DataTypes.UUID,
  },
});

User.hasMany(File, {
  foreignKey: "userId",
});

module.exports = File;
