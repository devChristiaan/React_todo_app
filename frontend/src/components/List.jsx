import { TableCell, TableRow } from "@material-ui/core"
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteList } from '../functions/helpers.js'


const List = (props) => {

  const deleteCurrentList = (id, url, reload) => {
    deleteList(id, url)
    reload(id)
  }
  

  return (
    <TableRow key={props.key}>
      <TableCell component="th" scope="row" onClick={props.openList}>
        {props.title}
      </TableCell>
      <TableCell align="right">
        <CreateIcon/>
        <DeleteIcon onClick={() => deleteCurrentList(props.listId, props.url, props.reload)}/>
      </TableCell>
    </TableRow>
  );
}

export default List;