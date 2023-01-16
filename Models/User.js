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
        password: {
            type: DataTypes.STRING,
            allowNull: false

        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: "users",
        defaultScope: {
            attributes: {
                exclude: ['password']
            },
            order: [['id', 'ASC']]
        },
        scopes: {
            withPassword: {
                attributes: {
                    include: ['password']
                }
            }
        },
        timestamps: false
    }

);

module.exports = User;