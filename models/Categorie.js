const { Sequelize } = require("sequelize/types");
const db = require("../database/db");
const { dbinfo } = require("../database/db");

module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(

        "categorie", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
            timrestamps: true,
            underscored: true
        }
    );
};