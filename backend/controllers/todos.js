const Todo = require("../models").Todo;

const findAll = async (req, res) => {
  const UserId = req.user.id;
  const todos = await Todo.findAll({ where: { UserId } });
  res.status(200).send(todos);
};

const create = async (req, res) => {
  const { text, parentId } = req.body;
  const UserId = req.user.id;
  const newTodo = await Todo.create({
    text,
    parentId,
    UserId
  });
  res.send(newTodo);
};

const update = async (req, res) => {
  const { text } = req.body;

  const todo = await Todo.findOne({ where: { id: req.params.id } });
  if (!todo) {
    throw Error(`Todo not updated. id: ${req.params.id}`);
  }

  todo.text = text;
  await todo.save();

  res.send(todo);
};

const destroy = async (req, res) => {
  await Todo.destroy({
    where: {
      id: req.params.id
    }
  });

  res.sendStatus(200);
};

module.exports = {
  findAll,
  create,
  update,
  destroy
};
