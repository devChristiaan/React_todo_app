import React, { useState, useEffect } from "react";
// import { fetchNotes } from "../functions/notepadHelpers";
// import axios from "axios";
import { Container, Paper } from '@material-ui/core';

const Note = () => {

  const url = process.env.REACT_APP_NOTEPAD_API;

  const [note, setNote] = useState("Untitled")
  const [title, setTitle] = useState("Message")
  const [noteID, setNoteID] = useState("1")

  
  useEffect(() => {
    const getData = async (url) => {
      const response = await fetch(url, {
          method: 'GET',
      })
      const data = await response.json()

      setNote(data[0].Content)
      setTitle(data[0].Title)
      setNoteID(data[0].NoteID)
  }

    getData(url);
  }, [url])

  const handleTitlChange = (e) => {
    setTitle(e.target.value)
  }

  const handleNoteChange = (e) => {
    setNote(e.target.value)
  }

  const saveNote = () => {
    const data = {
      Title: title,
      Content: note,
      NoteID: noteID
    }

    const postData = async (url, data) => {
      const response = await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      const result = await response.json()
      console.log(result)
  }

    postData(url, data)
  }

  return(
    <Container component={Paper}>
      <input value={title} onChange={(e) => handleTitlChange(e)}></input>
      <textarea value={note} onChange={(e) => handleNoteChange(e)}></textarea>
      <button type="submit" onClick={saveNote}>Save</button>
    </Container>
  )
}

export default Note;