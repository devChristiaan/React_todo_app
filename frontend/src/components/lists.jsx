import { Container, Paper, Typography, TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react"
import axios from 'axios';
import AddComp from "./addComp.jsx"
import List from "./List.jsx"
import ListItem from "./ListItem.jsx";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Lists = () => {
  const classes = useStyles();
  const titleLists = "List"
  const titleItems = "Item"
  const itemsUrl = `${process.env.REACT_APP_API + "listitems/"}`
  const listUrl = `${process.env.REACT_APP_API + "lists/"}`

  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadList, setLoadList] = useState(false);
  const [ListID, setListID] = useState(0);

  // load Lists
  useEffect(() => {
    setLoading(true);
      axios
        .get(listUrl)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
          console.log(error)
        }).finally(() => {
          setLoading(false);
        })
  }, [listUrl, error])

  // Open Selected List
  const openList = (list) => {
    setListID(list)
    setLoadList(true);
    setLoading(true)
    const fetchListItems = `${itemsUrl+list}`
    axios
      .get(fetchListItems)
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
        .get(listUrl)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
        }).finally(() => {
          setLoading(false);
        })
  }

  // Reload Items
  const reloadItems = () => {
    openList(ListID)
  }

  //Render Lists Comp
  const lists = data.map(list => {
    return (
      <List 
      key={list.ListID}
      listId={list.ListID}
      title={list.Title}
      url={listUrl}
      openList={() => openList(list.ListID)}
      />
    )})
  
  //Render List Items Comp
  const listItems = items.map(item => {
    return (
      <ListItem 
      key={item.ItemID}
      content={item.Content}
      ItemId={item.ItemID}
      ListId={ListID}
      url={itemsUrl}
      reloadItems={reloadItems}
      />
    )
  })

  //Choose whether to render list comp or list items comp
  if (!loadList) {
    //TO DO Lists
  return(
    <Container>
      <AddComp 
      title={titleLists}
      url={listUrl}
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
    //TO DO Items
    return(
      <Container>
        <AddComp 
        title={titleItems}
        url={itemsUrl}
        list={ListID}
        openList={openList} />
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