const knex = require("../../index");
const fs = require("fs");
knex
  .select("season")
  .count("id as played")
  .from("matches")
  .groupBy("season")
  .then((data) => {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(
      "/home/vikas/Desktop/knexproject/src/public/output/problem1.json",
      jsonData
    );

    console.log("Data has been written to output.json");
  })
  .catch(() => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
