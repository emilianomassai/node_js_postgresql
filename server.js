// REMEMBER TO OPEN POSTGRESQL APP AND CONNECT TO THE DATABASE BEFORE TRYING TO
// RUN THIS NODE APP LOCALLY!!

// REMINDER: to display an user from the postgres database (locally), write in
// the browser "http://localhost:5000/getPerson?id=1" where "id" is the user id
// of the table.

var express = require("express");
var app = express();

// say to the program what kind of database will be used
const { Pool } = require("pg");

const connectionString =
  process.env.DATABASE_URL ||
  //protocol_used://username:password@location_server:PORT/database_name
  "postgres://familyhistoryuser:elijah@localhost:5432/familyhistorydemo";

// establish the connection to the data source, passing all the data with json:
const pool = new Pool({ connectionString: connectionString });

app.set("port", process.env.PORT || 5000);

app.get("/getPerson", getPerson);

app.listen(app.get("port"), function () {
  console.log("Now listening for connections on port: ", app.get("port"));
});

function getPerson(req, res) {
  console.log("Getting person information.");

  // to search for person by id, we need to do the following:
  var id = req.query.id;
  console.log("Retrieving person with id: ", id);

  // call the function passing the typed id and the function which displays
  // the result on the console
  getPersonFromDb(id, function (error, result) {
    console.log("Back from the getPersonFromDb function with result: ", result);

    if (error || result == null || result.length != 1) {
      res.status(500).json({ success: false, data: error });
    } else {
      res.json(result[0]);
    }
  });

  // var result = {
  //   id: 238,
  //   first: "Emiliano",
  //   last: "Massai",
  //   birthdate: "1984-09-21",
  // };
  // res.json(result);
}

// define the getPersonFromDb function used above
function getPersonFromDb(id, callback) {
  console.log("getPersonFromDb called with id: ", id);

  // sequel, declaring that the passed id will be an integer and it will be
  // passed as first parameter
  var sql = "SELECT id, first, last birthdate FROM person WHERE id = $1::int";

  // parameters saved as array (in this case we have only a value, id)
  var params = [id];

  // to run it use the pool const with a single query (sql), passing the params and, when it's done, call the function

  // postgres module, please go and run this query (sql) with this parameters (params) and when is done call the callback function
  pool.query(sql, params, function (err, result) {
    if (err) {
      // if an error occurred, display the error to the console, showing what
      // and where occurred.
      console.log("An error with the DB occurred");
      console.log(err);
      callback(err, null);
    }

    // display the result as string from the json string
    console.log("Found DB result: " + JSON.stringify(result.rows));

    // once we got the result from DB, we pass it to the getPersonFromDb
    // function
    callback(null, result.rows);
  });
}
