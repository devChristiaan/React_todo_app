import { db } from './dbconnection.js'

const getLists = () => {
  const query = `SELECT * FROM lists`
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

export { getLists }