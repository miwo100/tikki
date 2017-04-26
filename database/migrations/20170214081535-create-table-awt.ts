'use strict';
import * as path from "path";
import * as fs from "fs";
import * as sequelize from "sequelize";

export = {
  up: function (queryInterface: sequelize.QueryInterface, Sequelize) {
    /*
    Add altering commands here.
    Return a promise to correctly handle asynchronicity.
    */

    //instead of sql scripts you can also use the queryInterface to change the sql schema

    return queryInterface.createTable( 'awt',  
    {
      id: {
        type: Sequelize.DataTypes.BIGINT(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      collaborator: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
      },
      issue: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
      },  
      description: {
        type: Sequelize.DataTypes.STRING(512),
        allowNull: true,
        defaultValue: null
      },  
      duration: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null
      }, 
      workdate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },   
      start: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },   
      end: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      }, 
      paid: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
      },   
      consolidated: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
      },                                          
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },  
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      }
    }); 
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
      return queryInterface.dropTable('awt');
  }
};
