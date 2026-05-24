const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connect");

const Message = sequelize.define("Message", 
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true, allowNull: false},
        content: { type: DataTypes.TEXT, allowNull: true },
        isRead: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false}
    },
    {
        tableName: "messages",
        timestamps: true
    }
)

module.exports = Message