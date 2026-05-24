const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connect");

const Conversation = sequelize.define("Conversation",
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true}
    },
    {
        tableName: "conversations",
        timestamps: true
    }
)

module.exports = Conversation