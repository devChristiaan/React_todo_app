import { db } from './dbconnection.js'

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

export { createNote }