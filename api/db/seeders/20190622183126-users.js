import bcrypt from 'bcryptjs';

const pass = '12345678';
// Hash password
const salt = bcrypt.genSaltSync(10);
const password = bcrypt.hashSync(pass, salt);

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [
    {
      userid: 'bh93hgj2fmj2',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@email.com',
      password,
    },
    {
      userid: 'bu67hgj2fmj2',
      firstname: 'Sarah',
      lastname: 'Lauren',
      email: 'sarah@email.com',
      password,
    },
    {
      userid: 'bh93hlh72fmj2',
      firstname: 'Mike',
      lastname: 'Dim',
      email: 'mike@email.com',
      password,
    },
  ], {}),

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
