const data = require("../data/databaseConnection");

/* /register */
exports.createUser = function (req, res, next) {
  let db = data.openDataConnection();
  let params = [
    req.body.email,
    req.body.username,
    req.body.avatarURL,
    req.body.mealplans,
    req.body.recipes,
  ];
  let sql =
    "INSERT INTO User(email, username, avatarURL, mealplans, recipes) VALUES (?, ?, ?, ?, ?)";

  db.run(sql, params, (err) => {
    if (err) {
      console.log(err.message);
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  });

  data.closeDataConnection(db);
};

/* /register-admin*/

/* login */

exports.getUserById = function (req, res, next) {
  let db = data.openDataConnection();
  let sql = "SELECT * FROM User WHERE id=?";

  db.get(sql, req.params.id, (err, row) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.send(row);
  });

  data.closeDataConnection(db);
};

exports.editUser = function (req, res, next) {
  let db = data.openDataConnection();
  let params = [
    req.body.email,
    req.body.name,
    req.body.user_pass,
    req.body.is_admin,
    req.params.id,
  ];
  let sql =
    "UPDATE User SET email=?, name=?, user_pass=?, is_admin=? WHERE id=?";

  console.log(sql);

  db.run(sql, params, (err) => {
    if (err) {
      console.log(err.message);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });

  data.closeDataConnection(db);
};

exports.deleteUser = function (req, res, next) {
  let db = data.openDataConnection();
  let sql = "DELETE FROM User WHERE id=?";

  db.run(sql, req.params.id, (err) => {
    if (err) {
      console.log(err.message);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });

  data.closeDataConnection(db);
};

exports.getUsers = function (req, res, next) {
  let db = data.openDataConnection();
  let sql = "SELECT * FROM User";

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.send(rows);
  });

  data.closeDataConnection(db);
};
