import { TableCell, TableRow } from "@material-ui/core"
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteToDo } from "../functions/helpers"



const ListItem = (props) => {

  const deleteItem = async (ItemId, ListId, url, reloadItems) => {
    await deleteToDo(ItemId, ListId, url)
    reloadItems(ListId)
  }

  return (
    <TableRow key={props.key}>
      <TableCell component="th" scope="row">
        {props.content}
      </TableCell>
      <TableCell align="right">
        <CreateIcon/>
        <DeleteIcon onClick={(e) => deleteItem(props.ItemId, props.ListId, props.url, props.reloadItems)}/>
      </TableCell>
    </TableRow>
  );
}

export default ListItem;