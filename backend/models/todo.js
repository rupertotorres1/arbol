"use strict";
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      text: DataTypes.STRING,
      UserId: DataTypes.INTEGER
    },
    {}
  );

  Todo.associate = (models) => {
    Todo.hasMany(Todo, {
      as: "subtodos",
      foreignKey: "parentId",
      onDelete: "CASCADE"
    });
    Todo.belongsTo(models.User);
  };

  return Todo;
};
