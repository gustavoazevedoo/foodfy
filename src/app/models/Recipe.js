const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
  all(callback) {
    db.query(`
    SELECT recipes.*, chefs.name AS author 
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    `, (err, results) => {
      if (err) throw `Database Error! ${err}`
      callback(results.rows)
    })
  },
  createRecipe(data, callback) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.chef,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()),
    ]

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },
  findRecipe(id, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS author 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.id = $1`, [id], (err, results) => {
        if (err) throw `Database Error! ${err}`

        callback(results.rows[0])
      }
    )
  },
  findBy(filter, callback) {
    db.query(`
    SELECT recipes.*, chefs.name AS author
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    WHERE recipes.title ILIKE '%${filter}%'
    
    `, (err, results) => {
      if (err) throw `Database Error! ${err}`
        callback(results.rows)
    })
  },
  update(data, callback) {
    const query = `
      UPDATE recipes SET
      chef_id=($1),
      image=($2),
      title=($3),
      ingredients=($4),
      preparation=($5),
      information=($6)
    WHERE id = $7
    `

    const values = [
      data.chef,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error ${err}`

      callback()
    })
  },
  deleteRecipe(id, callback) {
    db.query("DELETE FROM recipes WHERE id = $1", [id], (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback()
    })
  },
  chefsSelectOptions(callback) {
    db.query(`SELECT name, id FROM chefs`, (err, results) => {
      if (err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params

    let query = ``
    let filterQuery = ``
    let totalQuery = `(
      SELECT count(*) FROM recipes
    ) AS total`

    if (filter) {
      filterQuery = `
      WHERE recipes.title ILIKE '%${filter}%'
      `
      totalQuery = `(
        SELECT count(*) FROM recipes
        ${filterQuery}
      ) AS total`
    }

    query = `
    SELECT recipes.*, ${totalQuery}, chefs.name AS author
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    ${filterQuery}
    LIMIT $1 OFFSET $2
    `

    db.query(query, [limit, offset], (err, results) => {
      if (err) throw `Database Error! ${err}`
      
      callback(results.rows)
    })
  }
}