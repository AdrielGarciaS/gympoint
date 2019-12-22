module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'height', {
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'height');
  },
};
