const data = require("../data/databaseConnection");

exports.getMealPlans = function (req, res, next) {
  let db = data.openDataConnection();
  let params = [req.params.name];
  let sql = "SELECT * FROM MealPlan WHERE name = ?";

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.send(rows);
  });

  data.closeDataConnection(db);
};

exports.createMealPlan = function (req, res, next) {
  let db = data.openDataConnection();
  let params = [
    req.body.mealPlanName,
    req.body.recipeIdList,
    req.body.date,
    req.body.name,
  ];
  let sql =
    "INSERT INTO MealPlan(mealPlanName, recipeIdList, date, name) VALUES (?, ?, ?, ?)";

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

exports.getMealPlanById = function (req, res, next) {
  let db = data.openDataConnection();
  let sql = "SELECT * FROM MealPlan WHERE id=?";

  db.get(sql, req.params.id, (err, row) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.send(row);
  });

  data.closeDataConnection(db);
};

exports.editMealPlan = function (req, res, next) {
  let db = data.openDataConnection();
  let params = [
    req.body.name,
    req.body.recipeIdList,
    req.body.date,
    req.params.id,
  ];
  let sql = "UPDATE MealPlan SET name=?, recipeIdList=?, date=? WHERE id=?";

  // console.log(sql);

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

exports.deleteMealPlan = function (req, res, next) {
  let db = data.openDataConnection();
  let params = [req.params.name, req.params.id];
  let sql = "DELETE FROM MealPlan WHERE name=? AND id=?";

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
