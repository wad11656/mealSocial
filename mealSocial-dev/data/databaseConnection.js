const sqlite3 = require('sqlite3').verbose();
const path = require('path');

exports.openDataConnection = function() {
    let db = new sqlite3.Database(path.resolve(__dirname, 'mealSocialData.db'), (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the database.');
      });

      return db;
}

exports.closeDataConnection = function(db) {
    db.close();
    console.log("Closed Database")
}
