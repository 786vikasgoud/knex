const fs = require("fs");
const knex = require("../../index");
async function problem6() {
  try {
    const subquery = knex("matches as m2")
      .select(knex.raw("COUNT(player_of_match) as count"))
      .whereRaw("m2.season = m1.season")
      .groupBy("player_of_match")
      .orderBy("count", "desc")
      .limit(1);

    const mainQuery = await knex("matches as m1")
      .select("season", "player_of_match")
      .count("player_of_match as awards")
      .groupBy("season", "player_of_match")
      .having("awards", "=", subquery)
      .orderBy("season");

    console.log(mainQuery);
    fs.writeFile(
      "../public/output/problem6.json",
      JSON.stringify(mainQuery),
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}
problem6().finally(() => {
  knex.destroy();
});
