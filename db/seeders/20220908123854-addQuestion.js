module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Questions', [{
      question: '/1.png',
      list: 'один|два|два один|один два',
      answer: 'два',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      question: '/2.png',
      list: '42|"42"|7|"NaN"',
      answer: '7',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};
