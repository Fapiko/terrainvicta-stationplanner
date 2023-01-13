import {Card, Grid, Typography} from '@mui/material';
import Upkeep from './Upkeep';
import Income from './Income';

const Hab = (props) => {
    const hab = props.hab;

    return (
        <Grid item xs={2} style={{ minWidth: '150px' }}>
            <Card sx={{ p: 1 }}>
                <Typography variant="p" component="div">
                    {hab.friendlyName}
                </Typography>
                <Upkeep supportMaterialsMonthly={hab.supportMaterials_month} />
                <Income hab={hab} />
            </Card>
        </Grid>
    );
}

export default Hab;