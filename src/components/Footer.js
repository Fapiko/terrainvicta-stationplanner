import {Box, Grid, Link} from '@mui/material';

const Footer = () => {
    return (
        <Grid container>
            <Grid item xs={3}/>
            <Grid item xs={6}>
                <Box sx={{mt: 2, textAlign: 'center'}}>
                    <Link underline="hover"
                          target="_blank"
                          href="https://drives.terrainvictatools.com">Drive Chart</Link>
                </Box>
            </Grid>
            <Grid item xs={3}/>
        </Grid>)
}

export default Footer;
