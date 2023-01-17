import {useDispatch, useSelector} from 'react-redux';
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {basesActions} from '../../store/bases-slice';

const Bases = (props) => {
    const dispatch = useDispatch();
    const bases    = useSelector(state => state.bases);

    const deleteHandler = (baseName) => {
        dispatch(basesActions.removeBase({name: baseName}));
    }

    const baseList = bases.list.map(base => {
        return (
            <ListItem key={base.name} disablePadding secondaryAction={
                <IconButton edge="end"
                            aria-label="delete"
                            onClick={deleteHandler.bind(null, base.name)}>
                    <DeleteIcon/>
                </IconButton>
            }>
                <ListItemButton component="a" href={'#share/' + base.slug}>
                    <ListItemText primary={base.name}/>
                </ListItemButton>
            </ListItem>
        );
    });

    return (
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <Typography variant="h6" component="p" sx={{textAlign: 'center'}}>
                Saved Bases
            </Typography>
            <List>
                {baseList}
            </List>
        </Box>
    );
}

export default Bases;
