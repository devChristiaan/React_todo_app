import { TextField, Button } from "@material-ui/core"

const AddComp = (props) => {

  const placeholder = `Create New ${props.title}`

  return(
    <form onSubmit="">
      <TextField id="standard-basic" label={placeholder} />
      <Button variant="contained" color="primary" type="submit">Add</Button>
    </form>
  )
}

export default AddComp