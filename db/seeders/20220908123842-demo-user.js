module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      userName: 'John Doe',
      email: '123@ya.ru',
      password: '123',
      avatar: 'https://js-helper.herokuapp.com/lox.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
