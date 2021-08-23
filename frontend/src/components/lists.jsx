import { Container, Paper } from "@material-ui/core"
import AddComp from "./addComp.jsx"

const Lists = () => {

  const title = "Lists"
  const url = `http://localhost:3001/addlist`

  return(
    <Container>
      <AddComp 
      title={title}
      url={url} />
      <Paper>
      </Paper>
    </Container>
  )
}

export default Lists