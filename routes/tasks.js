const db = require('../database');
const router = require('express').Router();

//task
//buscar tarea
router.get('/tasks', async (req, res) => {
  try {
    const sql = 'select * from task';
    const params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//buscar por id
router.get('/tasks/:id', async (req, res) => {
  try {
    const sql = 'select * from task where id = ?';
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(row);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//elminar por id
router.delete('/tasks/:id', async (req, res) => {
  try {
    db.run('DELETE FROM task WHERE id = ?', req.params.id, function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: 'deleted', changes: this.changes });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//creo la tarea
router.post('/tasks', async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
    };

    const sql = 'INSERT INTO task (name, description) VALUES (?,?)';
    const params = [data.name, data.description];
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: data,
        id: this.lastID,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//editar tarea
router.put('/tasks/:id', async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      description: req.body.description,
    };

    db.run(
      `UPDATE task set 
         name = COALESCE(?,name), 
         description = COALESCE(?,description)
         WHERE id = ?`,
      [data.name, data.description, req.params.id],
      function (err, result) {
        if (err) {
          res.status(400).json({ error: res.message });
          return;
        }
        res.json({
          message: 'success',
          data: data,
          changes: this.changes,
        });
      },
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
