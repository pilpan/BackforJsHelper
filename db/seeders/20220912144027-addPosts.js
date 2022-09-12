'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Posts', [{
      title: 'Не могу запустить Гачи(',
      text: 'прохожу по ссылке но почему-то не загружается любимое гачи ссылка - https://vk.com/video-110210773_456239147',
      user_id: 1,
      postState: false,
      createdAt: new Date(),
      updatedAt: new Date(),
     },{
      title: 'Не получается сделать безе по рецепту(',
      text: 'Вот ссылка на репецт: https://ok.ru/video/1412039971304',
      user_id: 1,
      postState: false,
      createdAt: new Date(),
      updatedAt: new Date(),
     }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
