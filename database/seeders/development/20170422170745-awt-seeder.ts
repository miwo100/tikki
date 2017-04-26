'use strict';
import * as sequelize from "sequelize";

module.exports = {
  up: function (queryInterface: sequelize.QueryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */

    return queryInterface.bulkInsert('awt', [{
      id: 1,
      collaborator: 'Michael',
      issue: '#13',
      description: 'First issue',
      duration: 3.5,
      workdate: '2016-12-31 23:00:00',
      start: '2017-02-07 09:30:00',
      end: '2017-02-07 13:00:00',
      paid: false,
      consolidated: false,
      created_at: '2017-02-07 16:59:16',
      updated_at: '2017-02-07 16:59:16'
    },
    {
      id: 2,
      collaborator: 'Michael',
      issue: '#13',
      description: 'First issue',
      duration: 2,
      workdate: '2017-01-02 23:00:00',
      start: '2017-02-07 09:30:00',
      end: '2017-02-07 11:30:00',
      paid: false,
      consolidated: false,
      created_at: '2017-02-07 16:59:32',
      updated_at: '2017-02-07 16:59:32'
    }, {
      id: 3,
      collaborator: 'Thorsten',
      issue: '#14',
      description: 'CHA Calculator Konzept',
      duration: 8,
      workdate: '2017-01-04 23:00:00',
      start: '2017-02-07 09:30:00',
      end: '2017-02-07 17:30:00',
      paid: false,
      consolidated: false,
      created_at: '2017-02-07 17:00:05',
      updated_at: '2017-02-07 17:00:05'
    }, {
      id: 4,
      collaborator: 'Michael',
      issue: '#15',
      description: 'CHA Calculator Konzept und Programmierung',
      duration: 6,
      workdate: '2017-01-06 23:00:00',
      start: '2017-02-07 11:30:00',
      end: '2017-02-07 17:30:00',
      paid: false,
      consolidated: false,
      created_at: '2017-02-07 17:00:30',
      updated_at: '2017-02-07 17:00:30'
    }], {});

  },

  down: function (queryInterface: sequelize.QueryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

    */
    return queryInterface.bulkDelete('awt', {
      id: [1, 2, 3, 4]
    }
      ,
      {});
  }
};
