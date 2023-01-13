import {useState} from 'react';
import {Box} from '@mui/material';

const Base = (props) => {
    const [modules, setModules] = useState([]);

    return (
        <Box>
            <h1>Base</h1>
        </Box>
    );
}

export default Base;