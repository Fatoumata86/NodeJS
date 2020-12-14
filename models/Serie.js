module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "serie", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: false
            },
            saison: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: false
            },
            episode: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: false
            },
            duree: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },
            synopsis: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false
            },
            annee: {
                type: Sequelize.DataTypes.INTEGER(4),
                allowNull: false
            },
            langue: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: false
            },
            sousTitre: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: false
            },
        }, {
            timestamps: true,
            underscored: true
        }

    );
};