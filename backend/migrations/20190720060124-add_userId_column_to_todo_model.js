"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn("Todos", "UserId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: "Users",
        key: "id"
      }
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Todos", "UserId");
  }
};
