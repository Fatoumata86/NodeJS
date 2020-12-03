const { dbinfo, Sequelize } = require("../database/db");

module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "video", {
            id: {
                type: Sequelize.Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            video: {
                type: Sequelize.Datatypes.STRING(55),
                allowNull: true
            },
            duree: {
                type: Sequelize.Datatypes.INTEGER,
                allowNull: true
            }
        }, {
            timestamps: true,
            undersored: true
        }
    );
};