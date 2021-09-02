import { useState } from 'react'
import { TableCell, TableRow, TextField } from "@material-ui/core"
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { deleteToDo } from "../functions/helpers"
import { renameItem } from '../functions/helpers'



const ListItem = (props) => {

  const [edit, setEdit] = useState(false)
  const [content, setContent] = useState(props.content)

  const deleteItem = async (ItemId, ListId, url, reloadItems) => {
    await deleteToDo(ItemId, ListId, url)
    reloadItems(ListId)
  }

  const handleItemRename = (itemId, updateUrl, reloadItems, listId, content) => {
    renameItem(itemId, updateUrl, content)
    reloadItems(listId)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const editItem = () =>{
    if(edit){
      setEdit(false)
    } else {
      setEdit(true)
    }
    
  }


  function renderElement() {
    if (!edit){
      return (
        <>
        <TableCell component="th" scope="row">
          {props.content}
        </TableCell>
        <TableCell align="right">
          <CreateIcon onClick={editItem}/>
          <DeleteIcon onClick={(e) => deleteItem(props.ItemId, props.ListId, props.url, props.reloadItems)}/>
        </TableCell>
        </>
      );
    } else {
      return (
        <>
        <TableCell component="th" scope="row">
          <TextField onChange={(e) => handleContentChange(e)}id="standard-basic" label={props.content}/>
        </TableCell>
        <TableCell align="right">
        <SaveIcon onClick={(e) => handleItemRename(props.ItemId, props.updateUrl, props.reloadItems, props.listId, content)}/>
          <DeleteIcon onClick={(e) => deleteItem(props.ItemId, props.ListId, props.url ,props.reloadItems)}/>
        </TableCell>
        </>
      )
    }
  }
  return (
    <TableRow key={props.key}>
      {renderElement()}
    </TableRow>
  )
}

export default ListItem;