exports.getUsers = function(req, res, next) {
    res.send("Get Users!")
}

exports.createUser = function(req, res, next) {
    res.send("Create new User!")
}

exports.getUserById = function(req, res, next) {
    res.send("Get User by Id!")
}

exports.editUser = function(req, res, next) {
    res.send("Edit User by Id!")
}

exports.deleteUser = function(req, res, next) {
    res.send("Delete User By Id!")
}