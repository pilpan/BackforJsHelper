'use strict';
const fs = require('fs');
const path = require('path');
let arrAnsJun = fs.readFileSync(path.join(__dirname,'../../public/Jun/answerJun.txt'), 'utf-8').split('\n');
let arrListJun = fs.readFileSync(path.join(__dirname,'../../public/Jun/listJun.txt'), 'utf-8').split('\n');
arrAnsJun = arrAnsJun.map((el,index) => el = {
  question: `/Jun/${index+1}jun.js`,
  list: arrListJun[index],
  answer: el,
  cat_id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
});
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Questions', arrAnsJun, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Questions', null, {});
  }
};
