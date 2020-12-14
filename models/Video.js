module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "video", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            video: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
            duree: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            timestamps: true,
            underscored: true
        }
    );
};