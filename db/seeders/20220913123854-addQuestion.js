const fs = require('fs');

const path = require('path');

let arrRev = fs.readFileSync(path.join(__dirname,'../../public/Rev/answerRev.txt'), 'utf-8').split('\n');
arrRev = arrRev.map((el,index) => el = {
  question: `/Rev/${index+1}rev.js`,
  list: '',
  answer: el,
  cat_id: 4,
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Questions', arrRev, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};
