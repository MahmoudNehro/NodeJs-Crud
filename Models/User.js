const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
    },
    {
        sequelize,
        modelName: "users",
        timestamps: false
    }
);

module.exports = User;