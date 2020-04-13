const express = require("express");
const path = require("path");
const Enforcer = require("openapi-enforcer-middleware");
var cors = require("cors");

/* User Constants*/
const DB = require("./data/userData.js");
const config = require("./data/userConfig.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const db = new DB("sqlitedb.db");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
/* End of USER Constants*/

const app = express();
app.use(express.json());
app.use(cors());
// Create an enforcermiddleware instance

const enforcer = Enforcer(path.resolve(__dirname, "mealPlan.yaml"));

enforcer.controllers(path.resolve(__dirname, "controllers"));

app.use(enforcer.middleware());

/* USER Endpoints */

router.post("/register", function (req, res) {
  db.insert(
    [req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 8)],
    function (err) {
      if (err)
        return (
          res
            .status(500)
            //.send("There was a problem registering the user.");
            .send("A user with that email already exists.")
        );
      db.selectByEmail(req.body.email, (err, user) => {
        if (err)
          return res.status(500).send("There was a problem getting user");
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user });
      });
    }
  );
});

router.post("/register-admin", function (req, res) {
  db.insertAdmin(
    [req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 8), 1],
    function (err) {
      if (err)
        return (
          res
            .status(500)
            //.send("There was a problem registering the user.");
            .send("A user with that email already exists.")
        );
      db.selectByEmail(req.body.email, (err, user) => {
        if (err)
          return res.status(500).send("There was a problem getting user");
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user });
      });
    }
  );
});

router.post("/login", (req, res) => {
  db.selectByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });
    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token, user: user });
  });
});

app.use(router);

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});
