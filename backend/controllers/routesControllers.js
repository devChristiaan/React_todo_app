import { dbPool } from './dbconnection.js'

// @desc    Get all lists
// @route   GET /api/v1/lists
const getLists = (req, res, next) => {

  dbPool.getConnection((err, connection) => {
    if (err) throw err

    const query = 'SELECT * FROM lists'

    connection.query(query, (err, result) => {
      if (err) {
        res.status(404).send({notFound:"No Lists Found. Please Create a List"})
        connection.release()
      } else {
        res.status(200).send(JSON.stringify(result))
        connection.release()
      }
    })
  })
}

// @desc    Get all list items
// @route   GET /api/v1/listitems/:id
const getListItems = (req, res, next) => {
  
  dbPool.getConnection((err, connection) => {
    if (err) throw err

    const query = 'select * from item INNER JOIN list_items ON list_items.ListID = ? && item.ItemID = list_items.ItemID'

    connection.query(query, [req.params.id], (err, result) => {
      if (err) {
        res.status(404).send({notFound:"No Lists Items found. Please Create an Item"})
        connection.release()
      } else {
        res.status(200).send(JSON.stringify(result))
        connection.release()
      }
    })
  })
}
    
// @desc    Add a new List
// @route   POST /api/v1/lists
const addList = (req, res, next) => {

  dbPool.getConnection((err, connection) => {
    if (err) throw err

    const query = 'INSERT INTO lists (Title, Location) VALUES (?, 100);'

    connection.query(query, [req.body.content], (err, result) => {
      if (err) {
        res.status(404).send({notFound:"No Lists found. Please Create a List"})
        connection.release()
      } else {
        res.status(200).send({success:"List added successfully"})
        connection.release()
      }
    })
  })
}

// @desc    Add item and assign item to list
// @route   POST /api/v1/listitems/:id
const addItem = (req, res, next) => {
  
  dbPool.getConnection((err, connection) => {
    if (err) throw err

    const query = 'INSERT INTO item (Content, Location) VALUES (?, 100);'
  
    connection.query(query, [req.body.content], (err, result) => {
      if (err) {
        res.status(404).send({notFound:"Cannot create item"})
        connection.release()
      } else {
        assignItemList(req.params.id, result)
        connection.release()
      }
    })
  })

  const assignItemList = (listID, item) => {
  
    dbPool.getConnection((err, connection) => {
      if (err) throw err

      const query = 'INSERT INTO list_items (ListID, ItemID) VALUES (?, ?);'
    
      connection.query(query, [listID, item.insertId], (err, result) => {
        if (err) {
          res.status(404).send({notFound:"No Lists found to add item. Please Create a List first"})
          connection.release()
        } else {
          res.status(200).send({message: "Item Added to List"})
          connection.release()
        }
      })
    })
  }
}

// @desc    Delete item and remove item from list
// @route   DELETE /api/v1/listitems/:id
const deleteItem = (req, res, next) => {

  dbPool.getConnection((err, connection) => {
    const query = 'DELETE FROM list_items WHERE ItemID = ? && ListID = ?'

    connection.query(query, [req.params.id, req.body.ListID], (err, result) => {
      if (err) {
        res.status(404).send({notFound:"No list or item found"})
        connection.release()
      } else {
        removeItem()
        connection.release()
      }
    })
  })

  const removeItem = () => {
    dbPool.getConnection((err, connection) => {
      if(err) throw err

      const query2 = 'DELETE FROM item WHERE ItemID = ?'

      connection.query(query2, [req.params.id], (err, result) => {
        if (err) {
          res.status(404).send({notFound:"No Items found to delete"})
          connection.release()
        } else {
          res.status(200).send({message: "Item Deleted Successfully"})
          connection.release()
        }
      })
    })
  }
}

// @desc    Delete List and all list items
// @route   DELETE /api/v1/list/:id
const deleteList = async (req, res, next) => {

const listItems = (id) => {
  return new Promise((resolve) => {
    dbPool.getConnection((err, connection) => {
      if(err) throw err

      const query = 'select * from item INNER JOIN list_items ON list_items.ListID = ? && item.ItemID = list_items.ItemID'

      const setItems = (results) => {
        resolve(results.map(item => item.ItemID))
      }

      connection.query(query, [id], (err, result) => {
        if (err) {
          console.log(err);
          connection.release()
        } else {
          let data = JSON.stringify(result)
          connection.release()
          setItems(JSON.parse(data))
        }
      })
    })
  })
}

let list = await listItems(req.params.id)

  
const deleteListItems = (list) => {
  return new Promise((resolve) => {
    dbPool.getConnection((err, connection) => {
      if(err) throw err

      const query = 'DELETE FROM item WHERE (ItemID) IN (?)'

      connection.query(query, [list], (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).send({notFound:"List list items not found"})
          connection.release()
        } else {
          connection.release()
          resolve(result)
        }
      })
    })
  })
}

if (list.length > 0) await deleteListItems(list)

const deleteList = () => {
  return new Promise((resolve) => {
    dbPool.getConnection((err, connection) => {
      if(err) throw err
      const query = 'DELETE FROM lists WHERE ListID = ?;'

      connection.query(query, [req.params.id], (err, result) => {
        if (err) {
          res.status(404).send({notFound:"List not found"})
          connection.release()
        } else {
          res.status(200).send({message: "List Deleted Successfully"})
          connection.release()
          resolve()
        }
      })
    })
  })
}

await deleteList()

const deleteJoin = () => {
  return new Promise((resolve) => {
    dbPool.getConnection((err, connection) => {
      if(err) throw err

      const query = 'DELETE FROM list_items WHERE ListID = ?'

      connection.query(query, [req.params.id], (err, result) => {
        if (err) {
          res.status(404).send({notFound:"List not found"})
          connection.release()
        } else {
          res.status(200).send({message: "List Deleted Successfully"})
          connection.release()
          resolve()
        }
      })
    })
  })
}

await deleteJoin()

}

// @desc    Rename List
// @route   PATCH /api/v1/list/:id
const renameList = (req, res, next) => {

  dbPool.getConnection((err, connection) => {
    if(err) throw err

    const query = 'UPDATE lists SET Title = ? WHERE ListID = ?'

    connection.query(query, [req.body.data.title, req.params.id], (err, result) => {
      if (err) {
        res.status(404).send({notFound:"List not found"})
        connection.release()
      } else {
        res.status(200).send({message: "List Renamed Successfully"})
        connection.release()
      }
    })
  })
}


// @desc    Rename Item
// @route   PATCH /api/v1/item/:id
const renameItem = (req, res, next) => {

  dbPool.getConnection((err, connection) => {
    if(err) throw err
    const query = 'UPDATE item SET Content = ? WHERE ItemID = ?'

    connection.query(query, [req.body.data.content, req.params.id], (err, result) => {
    if (err) {
      res.status(404).send({notFound:"Item not found"})
      connection.release()
    } else {
      res.status(200).send({message: "Item Renamed Successfully"})
      connection.release()
    }
  })
  })
}


export { getLists, getListItems, addList, addItem, deleteItem, deleteList, renameList, renameItem }