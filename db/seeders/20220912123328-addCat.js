'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Categories', [{
       name: 'Junior',
       price: 10,
       createdAt: new Date(),
       updatedAt: new Date(),
     },{
      name: 'Middle',
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Senior',
      price: 500,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Rev',
      price: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
