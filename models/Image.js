const { dbinfo, Sequelize } = require("../database/db");

module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "image", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            image: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            },

        }, {
            timestramps: true,
            underscored: true
        }

    )
}