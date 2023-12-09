let knex = require("../../index");
let fs = require("fs");
knex
  .select(
    "batsman",
    "bowler",
    knex.raw(
      "(sum(case when dismissal_kind not like 'runn out' AND dismissal_kind not like '' then 1 else 0 end)) as count"
    )
  )
  .from("deliveries")
  .whereRaw("dismissal_kind not like 'run out' AND dismissal_kind not like '' ")
  .groupBy("batsman", "bowler")
  .orderBy("count", "desc")
  .limit("1")
  .then((data) => {
    fs.writeFileSync(
      "../public/output/problem8.json",
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
