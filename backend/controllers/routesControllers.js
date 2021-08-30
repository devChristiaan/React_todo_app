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

const getListItems = (id) => {
  const query = `select * from item INNER JOIN list_items ON list_items.ListID = ${id} && item.ItemID = list_items.ItemID`
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