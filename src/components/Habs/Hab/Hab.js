import {Card, Grid, IconButton, Typography} from '@mui/material';
import Upkeep from './Upkeep';
import Income from './Income';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {dndActions} from '../../../store/dnd-slice';
import {ITEM_TYPE_HAB} from '../../../store/dnd-constants';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {baseActions} from '../../../store/base-slice';

const Hab = (props) => {
    const dispatch               = useDispatch();
    const [details, showDetails] = useState(false);

    const detailsClickHandler = () => {
        showDetails(!details);
    }

    const onDragHandler = (e) => {
        dispatch(dndActions.startDrag({
            item:     props.hab,
            itemType: ITEM_TYPE_HAB,
        }))
    }

    const removeHandler = () => {
        dispatch(baseActions.removeHabFromBase({
            hab:      props.hab,
            quantity: 1,
        }))
    }

    const addHandler = () => {
        dispatch(baseActions.addHabToBase({
            hab:      props.hab,
            quantity: 1,
        }))
    }

    const hab       = props.hab;
    let detailItems = <></>;

    if (details) {
        detailItems = (<>
            <p>Power: {hab.power}</p>
            <p>Crew: {hab.crew}</p>
            <Upkeep supportMaterialsMonthly={hab.supportMaterials_month}/>
            <Income hab={hab}/>
        </>);
    }

    let counters = <></>;
    if (props.countable) {
        counters = <>
            <Grid item xs={4}>
                <IconButton onClick={addHandler}>
                    <AddIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={4}>
                <Typography variant={'subtitle2'} style={{textAlign: 'center', lineHeight: '40px'}}>
                    {hab.quantity}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <IconButton onClick={removeHandler}>
                    <RemoveIcon/>
                </IconButton>
            </Grid>
        </>;
    }

    return (
        <Grid item
              xs={2}
              style={{minWidth: '150px'}}
              draggable
              onDragStart={onDragHandler}>
            <Card sx={{p: 1}}>
                <Typography variant="p" style={{textAlign: 'center'}}
                            component="div"
                            onClick={detailsClickHandler}>
                    {hab.friendlyName}
                </Typography>
                {detailItems}
                <Grid container>
                    {counters}
                </Grid>
            </Card>
        </Grid>
    )
}

export default Hab;