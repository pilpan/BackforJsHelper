'use strict';
const fs = require('fs');
const path = require('path');
let arrAnsSen = fs.readFileSync(path.join(__dirname,'../../public/Sen/answerSen.txt'), 'utf-8').split('\n');
let arrListSen = fs.readFileSync(path.join(__dirname,'../../public/Sen/listSen.txt'), 'utf-8').split('\n');
arrAnsSen = arrAnsSen.map((el,index) => el = {
  question: `/Sen/${index+1}sen.js`,
  list: arrListSen[index],
  answer: el,
  cat_id: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
});
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Questions', arrAnsSen, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};
