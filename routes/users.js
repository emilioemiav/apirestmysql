const router = require('express').Router();
const db = require('../database');

router.get('/', async (req, res) => {
  try {
    const sql = 'select * from user';
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

router.get('/:id', async (req, res) => {
  try {
    const sql = 'select * from user where id = ?';
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
router.delete('/:id', async (req, res) => {
  try {
    db.run('DELETE FROM user WHERE id = ?', req.params.id, function (err, result) {
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

//creo el usuario
router.post('/', async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      lastName: req.body.lastName,
      age: req.body.age,
      address: req.body.address,
    };

    const sql = 'INSERT INTO user (name, lastName, age, address) VALUES (?,?,?, ?)';
    const params = [data.name, data.lastName, data.age, data.address];
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

//editar
router.put('/:id', async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      lastName: req.body.lastName,
      age: req.body.age,
      address: req.body.address,
    };

    db.run(
      `UPDATE user set 
         name = COALESCE(?,name), 
         lastName = COALESCE(?,lastName), 
         address = COALESCE(?,address),
         age = COALESCE(?,age)
         WHERE id = ?`,
      [data.name, data.lastName, data.address, data.age, req.params.id],
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
