let knex = require("../../index");
const fs = require("fs");

knex
  .select(
    "bowler",
    knex.raw(
      "(SUM(total_runs) / ((SUM(CASE WHEN wide_runs=0 AND noball_runs=0 THEN 1 ELSE 0 END)/6))) as economy"
    )
  )
  .from("deliveries")
  .join("matches", "match_id", "=", "id")
  .where("season", "=", "2015")
  .groupBy("bowler")
  .orderBy("economy")
  .limit("10")
  .then((data) => {
    fs.writeFileSync(
      "../public/output/problem4.json",
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
