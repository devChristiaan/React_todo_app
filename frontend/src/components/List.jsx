import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { TableCell, TableRow, TextField } from "@material-ui/core"
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { deleteList, renameList } from '../functions/helpers.js'


const List = (props) => {

  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState(props.title)

  const history = useHistory()

  const deleteCurrentList = (id, url) => {
    deleteList(id, url)
    history.go(0)
  }

  const handleListRename = (title, listId, url) => {
    renameList(title, listId, url)
    history.go(0)
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
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
        <>
        <TableCell component="th" scope="row" onClick={props.openList}>
        {props.title}
        </TableCell>
          <TableCell align="right">
          <CreateIcon onClick={editListItem}/>
          <DeleteIcon onClick={() => deleteCurrentList(props.listId, props.url, history)}/>
        </TableCell>
      </>
      )
    } else {
      return(
      <>
        <TableCell component="th" scope="row">
          <TextField onChange={(e) => handleTitleChange(e)}id="standard-basic" label={props.title}/>
        </TableCell>
        <TableCell align="right">
          <SaveIcon onClick={(e) => handleListRename(title, props.listId, props.url)}/>
          <DeleteIcon onClick={() => deleteCurrentList(props.listId, props.url, history)}/>
        </TableCell>
      </>
      )
    }
  } 

  return (
    <TableRow key={props.key}>
      { renderElement() }
    </TableRow>
  );
}

export default List;