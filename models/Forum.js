module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "forum", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            sujet: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
            image: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true
            }
        }, {
            timestamps: true,
            underscored: true
        }
    );
};