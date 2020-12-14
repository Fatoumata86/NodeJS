module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "inscrire", {
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