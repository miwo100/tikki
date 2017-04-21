"use strict";
var Sequelize = require("sequelize");
var orm = require("./orm");
var MySqlConnector = (function () {
    function MySqlConnector(server, database, user, password) {
        var _this = this;
        this.connector = new Sequelize(database, user, password, {
            host: server,
            dialect: "mysql"
        });
        this.connector.authenticate()
            .then(function () {
            console.log('Connection has been established successfully.');
            _this.mapModels();
        })
            .then(function () { return _this.connector.sync({ force: true }); })
            .catch(function (err) {
            console.log('Unable to connect to the database:', err);
        });
    }
    MySqlConnector.prototype.mapModels = function () {
        this.awt = this.connector.import("awt", orm.awtModelDefiner);
    };
    return MySqlConnector;
}());
exports.MySqlConnector = MySqlConnector;
//syncs all defined models with database tables, data will be deleted
//mysqlConnector.sync({ force: true })
//mysqlConnector.sync({ force: true }).then(() => {});
//resync table in case schema changes
//optinally insert test row
/*mysqlConnector.sync({ force: true }).then(() =>
{
    awt.create(
        {
            collaborator: "Michael",
            issue:  "issue #13",
            description: "issue #13 fixed",
            duration: 2.5,
            start: null,
            end: null,
            paid: true,
            consolidated: true
        }
    )
})*/ 
//# sourceMappingURL=mysqlConnector.js.map