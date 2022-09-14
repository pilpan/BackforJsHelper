const fs = require('fs');

const path = require('path');

let arr = fs.readFileSync(path.join(__dirname,'../../public/Rev/answerRev.txt'), 'utf-8').split('\n');
arr = arr.map((el,index) => el = {
  question: `/Rev/${index+1}rev.js`,
  list: '',
  answer: el,
  cat_id:4,
  createdAt: new Date(),
  updatedAt: new Date(),
});
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Questions', [...arr,{
      question: '/1.png',
      list: 'один|два|два и один|один и два',
      answer: 'Два',
      cat_id:1,
      createdAt: new Date(),
      updatedAt: new Date(),
     }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  },
};
