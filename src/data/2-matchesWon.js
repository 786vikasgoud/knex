let knex = require("../../index");
const fs = require("fs");
knex
  .select("season", "winner")
  .count("winner")
  .from("matches")
  .groupBy("season", "winner")
  .then((data) => {
    fs.writeFileSync(
      "../public/output/problem2.json",
      JSON.stringify(data, null, 2),
      (err) => {
        console.log(err);
      }
    );
  })
  .catch(() => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
