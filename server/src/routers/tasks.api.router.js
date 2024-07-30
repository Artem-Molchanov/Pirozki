const router = require('express').Router();
const { Task } = require('../../db/models');
const { verifyAccessToken } = require('../middleWares/verifyToken');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post('/', verifyAccessToken, async (req, res) => {
  const { title, text } = req.body;
  const { user } = res.locals;
  try {
    if (title && text) {
      const task = await Task.create({ title, text, user_id: user.id });
      res.json(task);
    } else {
      res.status(400).json({ message: 'Not all fields filled with data' });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.delete('/:id', verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = res.locals;
    const task = await Task.findByPk(id);
    if (task.user_id === user.id) {
      task.destroy();
      res.sendStatus(200);
    } else {
      res.status(400).json({ message: 'Haven`t rights to delete this entry' });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
