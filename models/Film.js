const { dbinfo, Sequelize } = require("../database/db");

module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "film", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titre: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
            duree: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true
            },
            synopsis: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            },
            langue: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
            version: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
            sousTitre: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
            annee: {
                type: Sequelize.DataTypes.INTEGER(4),
                allowNull: true
            },
        }, {
            timestramps: true,
            underscored: true
        }
    );
};