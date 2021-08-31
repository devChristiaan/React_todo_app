import { TableCell, TableRow } from "@material-ui/core"
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';



const List = (props) => {

  const deleteList = () => {

  }

  return (
    <TableRow key={props.key}>
      <TableCell component="th" scope="row" onClick={props.openList}>
        {props.title}
      </TableCell>
      <TableCell align="right">
        <CreateIcon/>
        <DeleteIcon onClick={(e) => deleteList()}/>
      </TableCell>
    </TableRow>
  );
}

export default List;