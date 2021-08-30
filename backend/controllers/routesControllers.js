import { db } from './dbconnection.js'

// @desc    Get all lists
// @route   GET /api/v1/lists
const getLists = (req, res, next) => {
  try {
    const query = `SELECT * FROM lists`

    db.query(query, (err, result) => {
      if (err) {
        res.status(404).send({notFound:"No Lists Found. Please Create a List"})
      } else {
        res.status(200).send(JSON.stringify(result))
      }
    })
  } catch (err) {
    res.status(500).send({error: err.message})
  }

}

// @desc    Get all lists items
// @route   GET /api/v1/listitems/:id
const getListItems = (req, res, next) => {
  
  try {
    const query = `select * from item INNER JOIN list_items ON list_items.ListID = ${req.params.id} && item.ItemID = list_items.ItemID`

    db.query(query, (err, result) => {
      if (err) {
        res.status(404).send({notFound:"No Lists Items found. Please Create an Item"})
      } else {
        res.status(200).send(JSON.stringify(result))
      }
    })
  } catch (err) {
    res.status(500).send({error: err.message})
  }
}
    
// @desc    Get all lists
// @route   GET /api/v1/lists
const addList = (title) => {
  const query = `INSERT INTO lists (Title, Location) VALUES ("${title}", 100);`
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

// @desc    Get all lists
// @route   GET /api/v1/lists
const addItem = (content) => {
  const query = `INSERT INTO item (Content, Location) VALUES ("${content}", 100);`
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

// @desc    Get all lists
// @route   GET /api/v1/lists
const assignItemList = (listID, itemID) => {
  const query = `INSERT INTO list_items (ListID, ItemID) VALUES (${listID}, ${itemID});`
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

export { getLists, getListItems, addList, addItem, assignItemList }