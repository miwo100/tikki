import * as fs from "fs";
import * as path from "path";
import * as Sequelize from "sequelize";
import * as config from "config";
import { UserModel } from "./models";

export interface Database {
  User?: UserModel;
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
}

let dbConfig: any = config.get<any>("dbConfig");

export let sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.server,
  dialect: "mysql"
});

export var db: Database = {
  sequelize: sequelize,
  Sequelize: Sequelize
};

var modelsFolder = path.join(__dirname, "models");

fs
  .readdirSync(modelsFolder)
  .filter((file) => {
    return (path.extname(file) == ".js" && file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach((file) => {
    var model: any = sequelize.import(path.join(modelsFolder, file));
    db[model.name] = model;
  }, this);

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
}, this);







