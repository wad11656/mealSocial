 const express = require('express')
 var mysql = require('mysql')
 const app = express()

 var connection = mysql.createConnection({
 	host: 'db',
 	user: 'it410mealplan',
 	password: '410mealRockWad',
 	database: 'mealplan'
 })
 connection.connect()

 app.get('/read', (req, res) => {


 	connection.query('SELECT * from Users', function (err, rows, fields) {
 		if (err) {
 			res.send(err)
 		}
 		else{
 			if(rows.length > 0){
 				var i;
 				var string_return = "";
 				for(i = 0; i < rows.length; i++){
 					string_return += rows[i].id + " " + rows[i].name + "<br>\n";
 				}
 			res.send(string_return)
 			}
 			else{
 				res.send('Empty table!\n')
 			}
 		}
 	})
 })

 app.put('/update', (req, res) => {
 	connection.query('UPDATE Users SET name = ? WHERE id = ?', [req.query.name, parseInt(req.query.id)], function (err, rows, fields) {
 		if (err) {
 			res.send(err)
 		}
 		else{
 			res.send('Update Successful\n')
 		}
 	})
 })

 app.post('/create', (req, res) => {
 	connection.query('INSERT INTO Users (name) VALUES (?)', req.query.name, function (err, rows, fields) {
 		 if (err) {
 			res.send(err)
 		}
 		else{
 			res.send('Create Successful\n')
 		}
 	})
 })

 app.delete('/delete', (req, res) => {
 	connection.query('DELETE FROM Users WHERE id = ?', req.query.id, function (err, rows, fields) {
 		if (err) {
 			res.send(err)
 		}
 		else{
 			res.send('Delete Successful\n')
 		}
 	})
 })

 app.listen(3000, err => {
 	if (err) return console.error(err.stack)
 		console.log('Server listening on port 3000')
 })