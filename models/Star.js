const { dbinfo, Sequelize } = require("../database/db");

module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "star", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncremment: true
            },
            acteur: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
            actrice: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
            description: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            },
            image: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            }
        }, {
            timestamps: true,
            underscored: true
        }

    );
};