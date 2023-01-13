import {Box, Grid} from '@mui/material';
import Hab from './Hab/Hab';
import modulesJson from '../../data/TIHabModuleTemplate.json';

function createModule(hab) {
    return <Hab key={hab.dataName} hab={hab} />;
}

const buildableModules = modulesJson.filter(module => !module.alienModule && !module.destroyed && !module.coreModule);

buildableModules.sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));

const modulesList = buildableModules.map(hab => {
    return createModule(hab);
});

const Habs = (props) => {
    console.log(modulesList);

    return (
        <Box>
            <Grid container spacing={1}>
                {modulesList}
            </Grid>
        </Box>
    );
}

export default Habs;