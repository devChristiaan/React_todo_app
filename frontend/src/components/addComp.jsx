import { Input, Button, Paper, Typography } from "@material-ui/core"
import useAdd from '../functions/useAdd.js'
import { useState } from 'react'

const AddComp = (props) => {

  const placeholder = `Create a New ${props.title}`
  const url = props.url

  const [item, setItem] = useState('')
  const [submit,setSubmit] = useState(false)
  const { data, loading, error } = useAdd(function add(){
    if (submit){
      return { item, url} 
    }
  })

  const addItem = (e) => {
    e.prevent.default()
    setSubmit(true)
  }

  return(
    <Paper align="center">
      <form onSubmit={addItem}>
        <Typography variant="h6" gutterBottom>{placeholder}</Typography>
        <Input id="standard-basic" onChange={setItem}/>
        <Button variant="contained" color="primary" type="submit">Add</Button>
      </form>
    </Paper>
  )
}

export default AddComp