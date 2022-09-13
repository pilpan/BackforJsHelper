'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Comments', [{
      text: 'John Doe я думаю тебе надо поменять запрос',
      post_id: 1,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
     }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Comments', null, {});
  }
};
