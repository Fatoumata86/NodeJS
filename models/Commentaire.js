module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "commentaire", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};