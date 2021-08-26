import { Input, Button, Paper, Typography } from "@material-ui/core"
import { useState } from 'react'
import axios from 'axios'

const AddComp = (props) => {

  const placeholder = `Create a New ${props.title}`
  const url = props.url

  const [item, setItem] = useState('')
  const [input, setInput] = useState('')
  console.log(item)

  const inputValue = (e) => {
    e.preventDefault()
    setItem(e.target.value)
  }

  const addItem = (item) => {
    axios
      .post(url, {data:{title:item}})
      .then(() => {
        props.reloadList()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return(
    <Paper align="center">
      <Typography variant="h6" gutterBottom>{placeholder}</Typography>
      <Input value={input} onChange={(e)=> inputValue(e) }/>
      <Button variant="contained" color="primary" onClick={addItem(item)}>Add</Button>
    </Paper>
  )
}

export default AddComp