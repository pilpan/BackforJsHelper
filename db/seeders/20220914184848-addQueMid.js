'use strict';
const fs = require('fs');
const path = require('path');
let arrAnsMid = fs.readFileSync(path.join(__dirname,'../../public/Mid/answerMid.txt'), 'utf-8').split('\n');
let arrListMid = fs.readFileSync(path.join(__dirname,'../../public/Mid/listMid.txt'), 'utf-8').split('\n');
arrAnsMid = arrAnsMid.map((el,index) => el = {
  question: `/Mid/${index+1}mid.js`,
  list: arrListMid[index],
  answer: el,
  cat_id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
});
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Questions', arrAnsMid, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Questions', null, {});
  }
};
