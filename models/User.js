const { dbinfo, Sequelize } = require("../database/db");

module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "user", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            pseudo: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
            email: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: false
            },
            forget: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
            pays: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
            sexe: {
                type: Sequelize.DataTypes.STRING(1),
                allowNull: true
            },
            image: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            },
            status: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: true
            }
        }, {
            timestamps: true,
            underscored: true
        }
    );
};