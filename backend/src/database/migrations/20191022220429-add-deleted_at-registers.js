module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('registers', 'deleted_at', {
      type: Sequelize.DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('registers', 'deleted_at');
  },
};
