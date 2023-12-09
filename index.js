const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "very_strong_password",
    database: "IPLproject",
  },
});

module.exports = knex;

//Perform a SELECT query using Knex
function matches() {
  knex
    .select("*")
    .from("matches")
    .then((results) => {
      console.log(results);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      // Close the Knex connection when done
      knex.destroy();
    });
}

function deliveries() {
  knex
    .select("*")
    .from("deliveries")
    .then((results) => {
      console.log(results);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      // Close the Knex connection when done
      knex.destroy();
    });
}
//matches();
//deliveries();
