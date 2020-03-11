const data = require('../data/databaseConnection');

exports.getIngredients = function(req, res, next) {
    let db = data.openDataConnection();
    let sql = 'SELECT * FROM Ingredient';

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.send(rows);
    });

    data.closeDataConnection(db);
}

exports.createIngredient = function(req, res, next) {
    let db = data.openDataConnection();
    let params = [req.body.ingredientList];
    let sql = 'INSERT INTO Ingredient(ingredientList) VALUES (?)';

    db.run(sql, params, (err) => {
        if (err) {
            console.log(err.message);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(201);
        }
      });

    data.closeDataConnection(db);
}

exports.getIngredientById = function(req, res, next) {
    let db = data.openDataConnection();
    let sql = 'SELECT * FROM Ingredient WHERE id=?';

    db.get(sql, req.params.id, (err, row) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.send(row);
    });

    data.closeDataConnection(db);
}

exports.editIngredient = function(req, res, next) {
    let db = data.openDataConnection();
    let params = [req.body.ingredientList, req.params.id];
    let sql = 'UPDATE Ingredient SET ingredientList=?  WHERE id=?';
    
    console.log(sql);

    db.run(sql, params, (err) => {
        if (err) {
            console.log(err.message);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(200);
        }
    });

    data.closeDataConnection(db);
}

exports.deleteIngredient = function(req, res, next) {
    let db = data.openDataConnection();
    let sql = 'DELETE FROM Ingredient WHERE id=?';

    db.run(sql, req.params.id, (err) => {
        if(err) {
            console.log(err.message);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(200);
        }
    });

    data.closeDataConnection(db);
}