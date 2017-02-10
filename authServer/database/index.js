"use strict";
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require("config");
var dbConfig = config.get("dbConfig");
exports.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.server,
    dialect: "mysql"
});
exports.db = {
    sequelize: exports.sequelize,
    Sequelize: Sequelize
};
var modelsFolder = path.join(__dirname, "models");
fs
    .readdirSync(modelsFolder)
    .filter(function (file) {
    return (path.extname(file) == ".js" && file.indexOf(".") !== 0) && (file !== "index.js");
})
    .forEach(function (file) {
    var model = exports.sequelize.import(path.join(modelsFolder, file));
    exports.db[model.name] = model;
}, this);
Object.keys(exports.db).forEach(function (modelName) {
    if ("associate" in exports.db[modelName]) {
        exports.db[modelName].associate(exports.db);
    }
}, this);
//# sourceMappingURL=index.js.map