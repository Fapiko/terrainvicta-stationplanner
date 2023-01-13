import {Card, Grid, Typography} from '@mui/material';
import Upkeep from './Upkeep';
import Income from './Income';
import {useState} from 'react';

const Hab = (props) => {
    const [details, showDetails] = useState(false);

    const detailsClickHandler = () => {
        showDetails(!details);
    }

    const hab       = props.hab;
    let detailItems = <></>;

    if (details) {
        detailItems = (<>
            <p>Power: {hab.power}</p>
            <Upkeep supportMaterialsMonthly={hab.supportMaterials_month}/>
            <Income hab={hab}/>
        </>);
    }

    return (
        <Grid item xs={2} style={{minWidth: '150px'}} draggable>
            <Card sx={{p: 1}}>
                <Typography variant="p" component="div" onClick={detailsClickHandler}>
                    {hab.friendlyName}
                </Typography>
                {detailItems}
            </Card>
        </Grid>
    )
}

export default Hab;