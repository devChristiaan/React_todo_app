import { TableCell, TableRow } from "@material-ui/core"
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

const ListItem = (props) => {
  return (
    <TableRow key={props.key}>
      <TableCell component="th" scope="row">
        {props.content}
      </TableCell>
      <TableCell align="right">
        <CreateIcon/>
        <DeleteIcon/>
      </TableCell>
    </TableRow>
  );
}

export default ListItem;