module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userid: {
      type: DataTypes.STRING,
      unique: true,
      required: true
    },
    firstname: {
      type: DataTypes.STRING,
      required: true
    },
    lastname: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      required: true
    },
    password: {
      type: DataTypes.STRING,
      required: true
    },
  }, {});
  users.associate = (models) => {
    // associations can be defined here
    users.hasMany(models.todos, {
      foreignKey: 'userid',
      as: 'todos'
    });
  };
  return users;
};
