module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    userid: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      required: true
    },
    firstname: {
      type: Sequelize.STRING,
      required: true
    },
    lastname: {
      type: Sequelize.STRING,
      required: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      required: true
    },
    password: {
      type: Sequelize.STRING,
      required: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('users')
};
