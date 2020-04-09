const data = require('../data/databaseConnection');

exports.getGroceryLists = function(req, res, next) {
    let db = data.openDataConnection();
    let sql = 'SELECT * FROM GroceryList';

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.send(rows);
    });

    data.closeDataConnection(db);
}

exports.createGroceryList = function(req, res, next) {
    let db = data.openDataConnection();
    let params = [req.body.ingredients, req.body.notes];
    let sql = 'INSERT INTO GroceryList(ingredients, notes) VALUES (?, ?)';

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

exports.getGroceryListById = function(req, res, next) {
    let db = data.openDataConnection();
    let sql = 'SELECT * FROM GroceryList WHERE id=?';

    db.get(sql, req.params.id, (err, row) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.send(row);
    });

    data.closeDataConnection(db);
}

exports.editGroceryList = function(req, res, next) {
    let db = data.openDataConnection();
    let params = [req.body.ingredients, req.body.notes, req.params.id];
    let sql = 'UPDATE GroceryList SET ingredients=?, notes=? WHERE id=?';
    
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

exports.deleteGroceryList = function(req, res, next) {
    let db = data.openDataConnection();
    let sql = 'DELETE FROM GroceryList WHERE id=?';

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