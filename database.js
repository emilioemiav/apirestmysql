const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'db.sqlite';

const db = new sqlite3.Database(DBSOURCE, err => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(
      `CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text, 
        lastName text, 
        address text,
        age INTEGER
      )`,
      err => {
        if (err) {
          console.log('Tabla User ya creada');
        } else {
          console.log('Tabla User creada exitosamente');
        }
      },
    );
    db.run(
      `CREATE TABLE role (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text, 
        description text
      )`,
      err => {
        if (err) {
          console.log('Tabla Role ya creada');
        } else {
          console.log('Tabla Role creada exitosamente');
        }
      },
    );
    db.run(
      `CREATE TABLE task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text, 
        description text
      )`,
      err => {
        if (err) {
          console.log('Tabla Task ya creada');
        } else {
          console.log('Tabla Task creada exitosamente');
        }
      },
    );
  }
});

module.exports = db;
