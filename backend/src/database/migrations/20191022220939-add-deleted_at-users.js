module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'deleted_at', {
      type: Sequelize.DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'deleted_at');
  },
};
