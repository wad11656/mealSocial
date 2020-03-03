exports.getGroceryLists = function(req, res, next) {
    res.send("Get GroceryLists!")
}

exports.getGroceryListById = function(req, res, next) {
    res.send("Get GroceryList by Id!")
}

exports.createGroceryList = function(req, res, next) {
    res.send("Create new GroceryList!")
}

exports.editGroceryList = function(req, res, next) {
    res.send("Edit GroceryList by Id!")
}

exports.deleteGroceryList = function(req, res, next) {
    res.send("Delete GroceryList By Id!")
}