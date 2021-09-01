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

// @desc    Get all list items
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
    
// @desc    Add a new List
// @route   POST /api/v1/lists
const addList = (req, res, next) => {

  const query = `INSERT INTO lists (Title, Location) VALUES ("${req.body.content}", 100);`
    db.query(query, (err, result) => {
      if (err) {
        res.status(404).send({notFound:"No Lists found. Please Create a List"})
      } else {
        res.status(200).send({success:"List added successfully"})
      }
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


export { getLists, getListItems, addList, addItem, deleteItem, deleteList }