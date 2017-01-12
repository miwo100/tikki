"use strict";
var Sequelize = require("sequelize");
function awtModelDefiner(sequelize, DataTypes) {
    return sequelize.define("awt", {
        id: { type: Sequelize.BIGINT(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true },
        collaborator: { type: Sequelize.STRING },
        issue: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        duration: { type: Sequelize.FLOAT },
        workdate: { type: Sequelize.DATE },
        start: { type: Sequelize.DATE },
        end: { type: Sequelize.DATE },
        paid: { type: Sequelize.BOOLEAN },
        consolidated: { type: Sequelize.BOOLEAN }
    }, {
        tableName: "awt",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    });
}
exports.awtModelDefiner = awtModelDefiner;
//# sourceMappingURL=awtModelDefiner.js.map