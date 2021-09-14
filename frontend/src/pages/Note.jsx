import React, { useState, useEffect } from "react";
import { fetchNotes } from "../functions/notepadHelpers";
import { Container } from '@material-ui/core';

const Note = () => {

  const url = process.env.REACT_APP_NOTEPADAPI;

  const [note, setNote] = useState()
  const [title, setTitle] = useState()

  useEffect(() => {
    const getData = async () => {

      const response = await fetchNotes(url);
      const data = await response

      setNote(data.Content)
      setTitle(data.Title)
    }
    getData();
  }, [url])

  return(
    <Container>
      <h1>{title}</h1>
      <textarea>{note}</textarea>
    </Container>
  )
}

export default Note;