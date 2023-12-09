let knex = require("../../index");
const fs = require("fs");

knex
  .select(
    "winner",
    knex.raw(
      "(count(case when winner like toss_winner then 1 else 0 end)) as times"
    )
  )
  .from("matches")
  .whereRaw("toss_winner =  winner")
  .groupBy("winner")
  .then((data) => {
    fs.writeFileSync(
      "../public/output/problem5.json",
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
