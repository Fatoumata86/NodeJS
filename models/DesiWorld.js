module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "desiWorld", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            fonction: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};