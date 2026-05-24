const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connect");

const User = sequelize.define("User",
    {
        id: {type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true, allowNull: false},
        username: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: { type: DataTypes.STRING, allowNull: false }
    },
    {
        tableName: "users",
        timestamps: true
    }
)

module.exports = User