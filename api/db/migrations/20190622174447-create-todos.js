module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('todos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    todoid: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      required: true
    },
    title: {
      type: Sequelize.STRING,
      required: true
    },
    content: {
      type: Sequelize.STRING,
      required: true
    },
    tags: {
      type: Sequelize.STRING,
      required: true
    },
    userid: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
      references: {
        model: 'users',
        key: 'userid',
        as: 'user'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
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
  down: queryInterface => queryInterface.dropTable('todos')
};
