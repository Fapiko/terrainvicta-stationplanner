import {Box, Grid, Link, Typography} from '@mui/material';

const Footer = () => {
    return (
        <Grid container>
            <Grid item xs={3}/>
            <Grid item xs={6}>
                <Box sx={{mt: 2, textAlign: 'center'}}>
                    <Typography>
                        Using content from v0.3.49 of Terra Invicta.
                    </Typography>
                    <Typography component="span">
                        Other tools:
                        <Link sx={{pl: 1}} underline="hover"
                              target="_blank"
                              href="https://drives.terrainvictatools.com">Drive Chart</Link>
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={3}/>
        </Grid>)
}

export default Footer;
