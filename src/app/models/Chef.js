const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
  all() {
    return db.query(`
    SELECT chefs.*, count(recipes) AS total_recipes
    FROM chefs
    LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
    GROUP BY chefs.id
    ORDER BY chefs.name`)
  },
  createChef(data, callback) {
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      date(Date.now()),
    ]

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },
  findChef(id) {
    return db.query(`
    SELECT chefs.*, count(recipes) AS total_recipes
    FROM chefs
    LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
    WHERE chefs.id = $1
    GROUP BY chefs.id
    `, [id]
    )
  },
  update(data, callback) {
    const query = `
      UPDATE chefs SET
      name=($1),
      avatar_url=($2)
    WHERE id = $3
    `

    const values = [
      data.name,
      data.avatar_url,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error ${err}`

      callback()
    })
  },
  deleteChef(id, callback) {
    db.query("DELETE FROM chefs WHERE id = $1", [id], (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback()
    })
  },
  recipesChef(id) {
    return db.query(`
    SELECT recipes.*
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.chef_id = $1
    ORDER BY recipes.title
    `, [id]
    )
  }
}