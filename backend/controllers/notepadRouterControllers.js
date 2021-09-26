import { dbPool } from './dbconnection.js'

// @desc    Create a new Note
// @route   POST /api/v1/notepad
const createNote = (req, res) => {

  dbPool.getConnection((err, connection) => {
    if (err) throw err

    const query = `INSERT INTO notes (Title, Content) VALUES (?, ?);`

    connection.query(query, [req.body.Title, req.body.Content], (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send({error: 'Error creating note'})
        connection.release();
      } else {
        res.status(200).send({success: 'Notepad created successfully'})
        connection.release();
      }
    })
  })
}

// @desc    Get all notes
// @route   GET /api/v1/notepad
const getNote = (req, res) => {
  // Need to update the function to take in the id of the note to be updated

  dbPool.getConnection((err, connection) => {
    if (err) throw err
    const query = `SELECT * FROM notes;`
  
    connection.query(query, (err, result) => {
      if (err) {
        res.status(500).send({error: 'Error creating note'})
        connection.release();
      } else {
        res.status(200).send(JSON.stringify(result))
        connection.release();
      }
    })
  })
}

// @desc    Update a Note
// @route   PATCH /api/v1/notepad
const updateNote = (req, res) => {
  
  dbPool.getConnection((err, connection) => {
    
    const query = `UPDATE notes SET Title = ?, Content = ? WHERE NoteID = ?;`
  
    connection.query(query, [req.body.Title, req.body.Content, req.body.NoteID], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({error: 'Error Editing Note'})
      connection.release();
    } else {
      res.status(200).send({success: 'Note edited Successfully'})
      connection.release();
    }
    })
  })
  
}

export { createNote, getNote, updateNote }