module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question: {
        type: Sequelize.TEXT,
      },
      list: {
        type: Sequelize.STRING,
      },
      answer: {
        type: Sequelize.TEXT,
      },
      cat_id:{
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id"
          },
          onDelete: "cascade",
          allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  },
};
