const Sequelize = require('sequelize')

// Connection
const sequelize = new Sequelize(
    'node_quiz',
    'root',
    '1234', 
    {
        dialect: 'mysql', 
        host: 'localhost',
        logging:false
    },
    
);

const db = {}
db.sequelize = sequelize;
db.test = require("../models/test.model")(sequelize, Sequelize);
db.users = require("../models/user.model")(sequelize, Sequelize);
db.admin = require("../models/admin.model")(sequelize, Sequelize);
db.question = require("../models/question.model")(sequelize, Sequelize);
db.Test_result = require('../models/testresult.modual')(sequelize, Sequelize);
db.result = require("../models/Result.modual")(sequelize, Sequelize);


db.test.hasMany(db.question);
db.question.belongsTo(db.test);

module.exports = db;