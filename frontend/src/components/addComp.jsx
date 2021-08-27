import { Input, Button, Paper, Typography } from "@material-ui/core"
import { useState } from 'react'
import axios from 'axios'

const AddComp = (props) => {

  const placeholder = `Create a New ${props.title}`
  let url = props.url
  const list = props.list

  
  if(list !== undefined) {
    url = url + `/${list}`
  }

  const [input, setInput] = useState('')

  const inputValue = (e) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  const addItem = () => {
    axios
      .post(url, {content:input})
      .then(() => {
        !props.reloadList() && props.openList(list)
      })
      .catch((err) => {
        console.log(err)
      })
      setInput('')
  }

  return(
    <Paper align="center">
      <Typography variant="h6" gutterBottom>{placeholder}</Typography>
      <Input value={input} onChange={(e)=> inputValue(e)}/>
      <Button variant="contained" color="primary" onClick={addItem}>Add</Button>
    </Paper>
  )
}

export default AddComp