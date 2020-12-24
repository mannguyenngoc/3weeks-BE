const Todo = require("../models/Todo.model");

module.exports.postTodo = (req, res) => {
  console.log(req.body);
  const newTask = new Todo({
    name: req.body.name,
    priority: req.body.priority.toString(),
    isFinished: false,
  });
  newTask.save();
  res.writeHead(302, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  });
};
module.exports.getTodo = (req, res) => {
  Todo.find({}, (err, tasks) => {
    if (err) throw err;

    res.status(200).send(tasks);
  });
};
module.exports.getTodoById = (req, res) => {
  Todo.findOne({_id: req.params.id}, (err, task) => {
    if (err) console.log(err);

    res.status(200).send(task);
  })
}
module.exports.getTodoCompleted = (req, res) => {
  Todo.find({ isFinished: true }, (err, tasks) => {
    if (err) throw err;

    res.status(200).send(tasks);
  });
};
module.exports.deleteTodo = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Todo.find({ _id: id })
    .deleteOne()
    .exec((err, result) => {
      console.log('hello')
      if (err) console.log(err);

      console.log(result);
    })
    res.status(204);
};
module.exports.updateTodo = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const todo = Todo.where({ _id: id });

  if (todo.name != req.body.name) {
    todo.updateOne({ $set: { name: req.body.name } }).exec();
  }
  if (todo.isFinished != req.body.isFinished) {
    todo.updateOne({ $set: { isFinished: req.body.isFinished } }).exec();
  }

  res.status(200);
};
