import { TableCell, TableRow } from "@material-ui/core"
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

const List = (props) => {
  return (
    <TableRow key={props.key}>
      <TableCell component="th" scope="row">
        {props.title}
      </TableCell>
      <TableCell align="right">
        <CreateIcon/>
        <DeleteIcon/>
      </TableCell>
    </TableRow>
  );
}

export default List;