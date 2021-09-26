import { dbPool } from './dbconnection.js'

// @desc    Get all lists
// @route   GET /api/v1/lists
const getLists = (req, res, next) => {

  dbPool.getConnection((err, connection) => {
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
  
  const query = `INSERT INTO item (Content, Location) VALUES ("${req.body.content}", 100);`
  
  db.query(query, (err, result) => {
    if (err) {
      res.status(404).send({notFound:"Cannot create item"})
    } else {
      assignItemList(req.params.id, result)
    }
  })

  const assignItemList = (listID, item) => {
  
    const query = `INSERT INTO list_items (ListID, ItemID) VALUES (${listID}, ${item.insertId});`
    
      db.query(query, (err, result) => {
        if (err) {
          res.status(404).send({notFound:"No Lists found to add item. Please Create a List first"})
        } else {
          res.status(200).send({message: "Item Added to List"})
        }
      })
    }
  }

// @desc    Delete item and remove item from list
// @route   DELETE /api/v1/listitems/:id
const deleteItem = (req, res, next) => {
  
  const query = `DELETE FROM list_items WHERE ItemID = "${req.params.id}" && ListID = "${req.body.ListID}"`

  db.query(query, (err, result) => {
    if (err) {
      res.status(404).send({notFound:"No list or item found"})
    } else {
      removeItem()
    }
  })

  const removeItem = () => {
    const query2 = `DELETE FROM item WHERE ItemID = "${req.params.id}"`

    db.query(query2, (err, result) => {
      if (err) {
        res.status(404).send({notFound:"No Items found to delete"})
      } else {
        res.status(200).send({message: "Item Deleted Successfully"})
      }
    })
  }
}

// @desc    Delete List and all list items
// @route   DELETE /api/v1/list/:id
const deleteList = async (req, res, next) => {

  const listItems = (id) => {
    return new Promise((resolve) => {
      const query = `select * from item INNER JOIN list_items ON list_items.ListID = ${id} && item.ItemID = list_items.ItemID`

    const setItems = (results) => {
      resolve(results.map(item => item.ItemID))
    }

    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let data = JSON.stringify(result)
        setItems(JSON.parse(data))
      }
    })
   
  })
}

  let list = await listItems(req.params.id)

  
  const deleteListItems = (list) => {
    return new Promise((resolve) => {
      const query = `DELETE FROM item WHERE (ItemID) IN (?)`

      db.query(query, [list], (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).send({notFound:"List list items not found"})
        } else {
          resolve(result)
        }
      })
    })
  }

  if (list.length > 0) await deleteListItems(list)
  
  const deleteList = () => {
    return new Promise((resolve) => {
      const query = `DELETE FROM lists WHERE ListID = "${req.params.id}"`

    db.query(query, (err, result) => {
      if (err) {
        res.status(404).send({notFound:"List not found"})
      } else {
        res.status(200).send({message: "List Deleted Successfully"})
      }
    })
    })
  }

  await deleteList()

  const deleteJoin = () => {
    return new Promise((resolve) => {
      const query = `DELETE FROM list_items WHERE ListID = "${req.params.id}"`

    db.query(query, (err, result) => {
      if (err) {
        res.status(404).send({notFound:"List not found"})
      } else {
        res.status(200).send({message: "List Deleted Successfully"})
      }
    })
    })
  }

  await deleteJoin()

}

// @desc    Rename List
// @route   PATCH /api/v1/list/:id
const renameList = (req, res, next) => {
  const query = `UPDATE lists SET Title = "${req.body.data.title}" WHERE ListID = "${req.params.id}"`

  db.query(query, (err, result) => {
    if (err) {
      res.status(404).send({notFound:"List not found"})
    } else {
      res.status(200).send({message: "List Renamed Successfully"})
    }
  })
}


// @desc    Rename Item
// @route   PATCH /api/v1/item/:id
const renameItem = (req, res, next) => {
  const query = `UPDATE item SET Content = "${req.body.data.content}" WHERE ItemID = "${req.params.id}"`

  db.query(query, (err, result) => {
    if (err) {
      res.status(404).send({notFound:"Item not found"})
    } else {
      res.status(200).send({message: "Item Renamed Successfully"})
    }
  })
}


export { getLists, getListItems, addList, addItem, deleteItem, deleteList, renameList, renameItem }