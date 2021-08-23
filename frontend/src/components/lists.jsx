import { Container, Paper } from "@material-ui/core"
import { useEffect, useState } from "react"
import AddComp from "./addComp.jsx"
import { useFetch } from "./useFetch"

const Lists = () => {

  const title = "Lists"
  const addListUrl = `http://localhost:3001/addlist`
  const fetchListUrl = `http://localhost:3001/lists`

  const [fetch, setFetch] = useState(false)
  const [fetchList, setFetchList] = useFetch(function fetch(){
    if (fetch){
    return { fetchListUrl} 
  }})

  useEffect(() => {
    setFetch(true)
  }, [])

  return(
    <Container>
      <AddComp 
      title={title}
      url={addListUrl} />
      <Paper>
        <h2>Lists</h2>
      </Paper>
    </Container>
  )
}

export default Lists