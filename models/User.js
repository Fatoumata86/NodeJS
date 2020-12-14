module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "user", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            pseudo: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: false
            },
            email: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            forget: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: true
            },
            pays: {
                type: Sequelize.DataTypes.STRING(55),
                allowNull: false
            },
            sexe: {
                type: Sequelize.DataTypes.STRING(1),
                allowNull: false
            },
            image: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false
            },
            status: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: true
            }
        }, {
            timestamps: false,
            underscored: true
        }
    );
};