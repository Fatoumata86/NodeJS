module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "img", {
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
            timestamps: true,
            underscored: true
        }

    );
};