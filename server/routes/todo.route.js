const express = require('express');
const router = express.Router();

const controller = require('../controllers/todo.controller');

router.post('/', controller.postTodo);
router.get('/', controller.getTodo);
router.get('/:id', controller.getTodoById);
router.get('/completed',  controller.getTodoCompleted);
router.delete('/:id', controller.deleteTodo);
router.put('/:id', controller.updateTodo);

module.exports = router;