import { Container, Paper, Typography, TableContainer, Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react"
import axios from 'axios';
import AddComp from "./addComp.jsx"
import List from "./List.jsx"
import ListItem from "./ListItems.jsx";


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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadList, setLoadList] = useState(false);
  const [loadListID, setLoadListID] = useState(false)

  const fetchListItemsUrl = `http://localhost:3001/listitems/${loadListID}`

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
    setLoadList(true);
    setLoading(true)
    setLoadListID(list.ListID);
    axios
        .get(fetchListItemsUrl)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
        }).finally(() => {
          setLoading(false);
        })
  }

  if(loadList){
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
  }

  const lists = data.map(list => {
    return (
      <List 
      key={list.ListID}
      title={list.Title}
      openList={() => openList(list.ListID)}
      />
    )})

  const listItems = data.map(list => {
    return (
      <ListItem 
      key={list.ListID}
      title={list.Title}
      />
    )
  })

  if (!loadList) {
  return(
    <Container>
      <AddComp 
      title={title}
      url={addListUrl} />
      <TableContainer component={Paper}>
      <Typography variant="h5">Your Todo Lists</Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading === true ? <TableRow><TableCell>Loading...</TableCell></TableRow> : null}
          {lists !== null ? lists : null}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  )
  } else {
    return(
      <Container>
        <AddComp 
        title={title}
        url={addListUrl} />
        <TableContainer component={Paper}>
        <Typography variant="h5">Your Todo Items</Typography>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ToDo</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading === true ? <TableRow><TableCell>Loading...</TableCell></TableRow> : null}
            {listItems !== null ? listItems : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
  }
}

export default Lists