import {Card, Grid, IconButton, Typography} from '@mui/material';
import Upkeep from './Upkeep';
import Income from './Income';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {dndActions} from '../../../store/dnd-slice';
import {ITEM_TYPE_HAB} from '../../../store/dnd-constants';
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
            hab: props.hab,
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

    let removeButton = <></>;
    if (props.removable) {
        removeButton = <IconButton onClick={removeHandler}><RemoveIcon/></IconButton>;
    }

    return (
        <Grid item
              xs={2}
              style={{minWidth: '150px'}}
              draggable
              onDragStart={onDragHandler}>
            <Card sx={{p: 1}}>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography variant="p"
                                    component="div"
                                    onClick={detailsClickHandler}>
                            {hab.friendlyName}
                        </Typography>
                        {detailItems}
                    </Grid>
                    <Grid item xs={2}>
                        {removeButton}
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default Hab;