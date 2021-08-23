import { Container, Paper, Typography, TableContainer, Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react"
import axios from 'axios';
import AddComp from "./addComp.jsx"
import List from "./List.jsx"


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Lists = () => {
  const classes = useStyles();
  const title = "Lists"
  const addListUrl = `http://localhost:3001/addlist`
  const fetchListUrl = `http://localhost:3001/lists`

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
      axios
        .get(fetchListUrl)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
        }).finally(() => {
          setLoading(false);
        })
  }, [fetchListUrl])

  const openList = (list) => {
    console.log(list);
  }

  console.log(data);

  const list = data.map(list => {
    return (
      <List 
      key={list.ListID}
      title={list.Title}
      onClick={() => openList(list.ListID)}
      />
    )
  })

  return(
    <Container>
      <AddComp 
      title={title}
      url={addListUrl} />
      <TableContainer component={Paper}>
      <Typography>Your Todo Lists</Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading === true ? <TableRow><TableCell>Loading...</TableCell></TableRow> : null}
          {error === true ? <TableRow><TableCell>Error Occured Please reload</TableCell></TableRow> : null}
          {list !== null ? list : null}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  )
}

export default Lists