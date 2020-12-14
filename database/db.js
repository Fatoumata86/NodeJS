const Sequelize = require("sequelize");

const db = {};

const dbinfo = new Sequelize("db_desiworld", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    pool: {
        max: 5,
        min: 0
    }
});

dbinfo.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

db.categorie = require("../models/Categorie")(dbinfo, Sequelize);
db.commentaire = require("../models/Commentaire")(dbinfo, Sequelize);
db.desiWorld = require("../models/DesiWorld")(dbinfo, Sequelize);
db.film = require("../models/Film")(dbinfo, Sequelize);
db.forum = require("../models/Forum")(dbinfo, Sequelize);
db.img = require("../models/Image")(dbinfo, Sequelize);
db.serie = require("../models/Serie")(dbinfo, Sequelize);
db.star = require("../models/Star")(dbinfo, Sequelize);
db.user = require("../models/User")(dbinfo, Sequelize);
db.video = require("../models/Video")(dbinfo, Sequelize);
db.avoir = require("../models/Avoir")(dbinfo, Sequelize);
db.inscrire = require("../models/Inscrire")(dbinfo, Sequelize);
db.jouer = require("../models/Jouer")(dbinfo, Sequelize);
db.laisser = require("../models/Laisser")(dbinfo, Sequelize);
db.mettre = require("../models/Mettre")(dbinfo, Sequelize);
db.regarder = require("../models/Regarder")(dbinfo, Sequelize);
db.voir = require("../models/Voir")(dbinfo, Sequelize);
db.commenter = require("../models/Commenter")(dbinfo, Sequelize);
db.representer = require("../models/Representer")(dbinfo, Sequelize);
db.interpreter = require("../models/Interpreter")(dbinfo, Sequelize);


db.desiWorld.hasOne(db.desiWorld, { foreignKey: "forumId" });
db.forum.belongsTo(db.desiWorld, { foreignKey: "forumId" });

db.film.hasMany(db.img, { foreignKey: "filmId" });
db.film.hasMany(db.video, { foreignKey: "filmId" });

db.serie.hasMany(db.img, { foreignKey: "serieId" });
db.serie.hasMany(db.video, { foreignKey: "serieId" });

db.desiWorld.belongsToMany(db.user, { through: 'inscrire', foreignKey: 'desiWorldId' });
db.user.belongsToMany(db.desiWorld, { through: 'inscrire', foreignKey: 'userId' });

db.user.belongsToMany(db.film, { through: 'regarder', foreignKey: 'userId' });
db.film.belongsToMany(db.user, { through: 'regarder', foreignKey: 'filmId' });

db.user.belongsToMany(db.serie, { through: 'voir', foreignKey: 'userId' });
db.serie.belongsToMany(db.user, { through: 'voir', foreignKey: 'serieId' });

db.commentaire.belongsToMany(db.user, { through: 'mettre', foreignKey: 'commentaireId' });
db.user.belongsToMany(db.commentaire, { through: 'mettre', foreignKey: 'userId' });

db.star.belongsToMany(db.film, { through: 'jouer', foreignKey: 'starId' });
db.film.belongsToMany(db.star, { through: 'jouer', foreignKey: 'filmId' });

db.star.belongsToMany(db.serie, { through: 'interpreter', foreignKey: 'starId' });
db.serie.belongsToMany(db.star, { through: 'interpreter', foreignKey: 'serieId' });

db.commentaire.belongsToMany(db.film, { through: 'laisser', foreignKey: 'commentaireId' });
db.film.belongsToMany(db.commentaire, { through: 'laisser', foreignKey: 'filmId' });

db.commentaire.belongsToMany(db.serie, { through: 'commenter', foreignKey: 'commentaireId' });
db.serie.belongsToMany(db.commentaire, { through: 'commenter', foreignKey: 'serieId' });

db.categorie.belongsToMany(db.film, { through: 'avoir', foreignKey: 'categorieId' });
db.film.belongsToMany(db.categorie, { through: 'avoir', foreignKey: 'filmId' });

db.categorie.belongsToMany(db.serie, { through: 'representer', foreignKey: 'categorieId' });
db.serie.belongsToMany(db.categorie, { through: 'representer', foreignKey: 'serieId' });

db.desiWorld.hasMany(db.film, { foreignKey: "filmId" });
db.film.belongsTo(db.desiWorld, { foreignKey: "filmId" });

db.desiWorld.hasMany(db.serie, { foreignKey: "serieId" });
db.serie.belongsTo(db.desiWorld, { foreignKey: "serieId" });


db.dbinfo = dbinfo;
db.Sequelize = Sequelize;

//dbinfo.sync({ force: true });

//dbinfo.sync();

module.exports = db;