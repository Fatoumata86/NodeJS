module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "star", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncremment: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: false
            },
            prenom: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: false
            },
            description: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false
            },
            image: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false
            }
        }, {
            timestamps: true,
            underscored: true
        }

    );
};