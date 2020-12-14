module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "interpreter", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            quantite: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true
            },
        }, {
            timestamps: false,
            underscored: true
        }
    );
};