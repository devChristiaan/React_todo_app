import { Container, Paper, Typography, TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Button } from "@material-ui/core"
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
  const titleLists = "List"
  const titleItems = "Item"
  const addListUrl = `http://localhost:3001/addlist`
  const addItemUrl = `http://localhost:3001/addlist`
  const fetchListUrl = `http://localhost:3001/lists`

  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadList, setLoadList] = useState(false);

  // load Lists
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

  // Open Selected List
  const openList = async (e, list) => {
    e.preventDefault()
    setLoadList(true);
    setLoading(true)
    const fetchListItemsUrl = `http://localhost:3001/listitems/${list}`
    axios
      .get(fetchListItemsUrl)
      .then((res) => {
        setItems(res.data)
      })
      .catch((err) => {
        setError(err);
      }).finally(() => {
        setLoading(false);
      })
  }

  //Close List
  const closeList = () => {
    setLoadList(false);
  }

  //Reload New List
  const reloadList = () => {
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
  }
  //Render Lists Comp
  const lists = data.map(list => {
    return (
      <List 
      key={list.ListID}
      title={list.Title}
      openList={(e) => openList(e, list.ListID)}
      />
    )})
  
  //Render List Items Comp
  const listItems = items.map(list => {
    return (
      <ListItem 
      key={list.ItemID}
      title={list.Title}
      />
    )
  })

  //Choose whether to render list comp or list items comp
  if (!loadList) {
  return(
    <Container>
      <AddComp 
      title={titleLists}
      url={addListUrl}
      reloadList={reloadList} />
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
        title={titleItems}
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
        <Button variant="contained" color="primary" onClick={closeList}>Back To Lists</Button>
      </TableContainer>
    </Container>
  )
  }
}

export default Lists