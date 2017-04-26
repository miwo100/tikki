'use strict';
import * as path from "path";
import * as sequelize from "sequelize";
import { Sequelize } from "sequelize"
import { executeSqlScript } from "../src/executeSqlScript";

export = {
  up: function (queryInterface: sequelize.QueryInterface, Sequelize: Sequelize) {
    
    /*
    Add altering commands here.
    Return a promise to correctly handle asynchronicity.
    */

    // this is how to execute script with the same base name as the migration file + suffix sql
    var filePath = path.join(__dirname, 'sql', path.basename(__filename, '.js') + '.sql');
    return executeSqlScript(queryInterface, filePath);

    },

  down: function (queryInterface, Sequelize) {
    
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */

    var filePath = path.join(__dirname, 'sql', path.basename(__filename, '.js') + '.undo.sql');
    return executeSqlScript(queryInterface, filePath);

  },    
};
