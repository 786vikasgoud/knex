let knex = require("../../index");
let fs = require("fs");
knex
  .select(
    "season",
    "batsman",
    knex.raw(
      "(SUM(total_runs-extra_runs) / SUM(CASE WHEN wide_runs=0 AND noball_runs=0 then 1 else 0 end)) * 100 as strikrate"
    )
  )
  .from("deliveries")
  .join("matches", "match_id", "=", "id")
  .groupBy("season", "batsman")
  .then((data) => {
    fs.writeFileSync(
      "../public/output/problem7.json",
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
