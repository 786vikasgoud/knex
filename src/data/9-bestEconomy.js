let knex = require("../../index");
let fs = require("fs");
knex
  .select(
    "bowler",
    knex.raw(
      "(SUM(total_runs) / (SUM(CASE WHEN wide_runs = 0 AND noball_runs = 0 THEN 1 ELSE 0 END)/6)) as strike"
    )
  )
  .from("deliveries")
  .whereRaw("is_super_over = 1 ")
  .groupBy("bowler")
  .orderBy("strike")
  .limit("1")
  .then((data) => {
    fs.writeFileSync(
      "../public/output/problem9.json",
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
