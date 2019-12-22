module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'weight', {
      type: Sequelize.DOUBLE,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'weight');
  },
};
