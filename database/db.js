const Sequelize = require("sequelize");

const db = {};

const dbinfo = new Sequelize("db_desiworld", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    pool: {
        max: 5,
        min: 0,
    }
});

dbinfo
    .authenticate()
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
db.image = require("../models/Image")(dbinfo, Sequelize);
db.serie = require("../models/Serie")(dbinfo, Sequelize);
db.star = require("../models/Star")(dbinfo, Sequelize);
db.user = require("../models/User")(dbinfo, Sequelize);
db.video = require("../models/Video")(dbinfo, Sequelize);



db.dbinfo = dbnfo;
db.Sequelize = Sequelize;

//dbinfo.sync({ force: true });

//dbinfo.sync();

module.exports = db;