import { db } from './dbconnection.js'

// @desc    Create a new Note
// @route   POST /api/v1/notepad
const createNote = (req, res) => {
  
  const query = `INSERT INTO notes (Title, Content) VALUES ('${req.body.Title}', '${req.body.Content}')`
  
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({error: 'Error creating note'})
    } else {
      res.status(200).send({success: 'Notepad created successfully'})
    }
  })
}

// @desc    Get all notes
// @route   GET /api/v1/notepad
const getNote = (req, res) => {
  // Need to update the function to take in the id of the note to be updated

  const query = `SELECT * FROM notes`
  
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({error: 'Error creating note'})
    } else {
      res.status(200).send(JSON.stringify(result))
    }
  })
}

// @desc    Update a Note
// @route   PATCH /api/v1/notepad
const updateNote = (req, res) => {
  
  const query = `INSERT INTO notes (Title, Content) VALUES ('${req.body.Title}', '${req.body.Content}')`
  
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({error: 'Error creating note'})
    } else {
      res.status(200).send({success: 'Notepad created successfully'})
    }
  })
}

export { createNote, getNote, updateNote }