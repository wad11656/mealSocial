exports.getGrocerLists = function(req, res, next) {
    res.send("Get GrocerLists!")
}

exports.getGrocerListById = function(req, res, next) {
    res.send("Get GrocerList by Id!")
}

exports.createGrocerList = function(req, res, next) {
    res.send("Create new GrocerList!")
}

exports.editGrocerList = function(req, res, next) {
    res.send("Edit GrocerList by Id!")
}

exports.deleteGrocerList = function(req, res, next) {
    res.send("Delete GrocerList By Id!")
}