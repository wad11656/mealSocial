"use strict";
const data = require('../data/databaseConnection');

class Db {
  constructor(file) {
    this.db = data.openDataConnection();
  }

  selectByEmail(email, callback) {
    return this.db.get(`SELECT * FROM User WHERE email = ?`, [email], function(
      err,
      row
    ) {
      callback(err, row);
    });
  }

  insertAdmin(user, callback) {
    return this.db.run(
      "INSERT INTO User (name,email,user_pass,is_admin) VALUES (?,?,?,?)",
      user,
      err => {
        callback(err);
      }
    );
  }

  selectAll(callback) {
    return this.db.all(`SELECT * FROM User`, function(err, rows) {
      callback(err, rows);
    });
  }

  insert(user, callback) {
    return this.db.run(
      "INSERT INTO User (name,email,user_pass) VALUES (?,?,?)",
      user,
      err => {
        callback(err);
      }
    );
  }
}

module.exports = Db;