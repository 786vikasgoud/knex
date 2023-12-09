let knex = require("../../index");
const fs = require("fs");
knex
  .select("batting_team")
  .sum("extra_runs as extraruns")
  .from("deliveries")
  .leftJoin("matches", "matches.id", "=", "deliveries.match_id")
  .where("matches.season", "=", "2016")
  .groupBy("batting_team")
  .then((data) => {
    fs.writeFileSync(
      "../public/output/problem3.json",
      JSON.stringify(data),
      (err) => {
        console.log(err);
      }
    );
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
