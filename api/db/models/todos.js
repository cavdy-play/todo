module.exports = (sequelize, DataTypes) => {
  const todos = sequelize.define('todos', {
    todoid: {
      type: DataTypes.STRING,
      unique: true,
      required: true
    },
    title: {
      type: DataTypes.STRING,
      required: true
    },
    content: {
      type: DataTypes.STRING,
      required: true
    },
    tags: {
      type: DataTypes.STRING,
      required: true
    }
  }, {});
  todos.associate = (models) => {
    // associations can be defined here
    todos.belongsTo(models.users, {
      foreignKey: 'userid',
      as: 'users'
    });
  };
  return todos;
};
