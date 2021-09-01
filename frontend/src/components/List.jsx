import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { TableCell, TableRow, TextField } from "@material-ui/core"
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteList } from '../functions/helpers.js'


const List = (props) => {

  const [edit, setEdit] = useState(false)

  const history = useHistory()

  const deleteCurrentList = (id, url) => {
    deleteList(id, url)
    history.go(0)
  }

  const editListItem = () =>{
    if(edit){
      setEdit(false)
    } else {
      setEdit(true)
    }
    
  }
  
  function renderElement() {
    if(!edit){
      return(
        <TableCell component="th" scope="row" onClick={props.openList}>
        {props.title}
      </TableCell>
      )
    } else {
      return(
        <TableCell component="th" scope="row">
          <TextField id="standard-basic" label={props.title}/>
        </TableCell>
      )
    }
  } 

  return (
    <TableRow key={props.key}>
      { renderElement() }
      <TableCell align="right">
        <CreateIcon onClick={editListItem}/>
        <DeleteIcon onClick={() => deleteCurrentList(props.listId, props.url, history)}/>
      </TableCell>
    </TableRow>
  );
}

export default List;