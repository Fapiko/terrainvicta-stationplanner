import {
    Box,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import Hab from '../Habs/Hab/Hab';
import {v4 as uuidv4} from 'uuid';
import {dndActions} from '../../store/dnd-slice';
import {ITEM_TYPE_HAB, TARGET_TYPE_BASE} from '../../store/dnd-constants';
import {baseActions} from '../../store/base-slice';
import Summary from './Summary';
import habsJson from '../../data/TIHabModuleTemplate.json';
import {useState} from 'react';

const Base = (props) => {
    const draggedItem                           = useSelector(state => state.dnd.item);
    const draggedItemType                       = useSelector(state => state.dnd.itemType);
    const dispatch                              = useDispatch();
    const unsortedHabs                          = useSelector(state => state.base.habs);
    const habCore                               = useSelector(state => state.base.habCore);
    const [defensesPowered, setDefensesPowered] = useState(true);

    let coreHabs = habsJson.filter(hab => hab.coreModule === true && !hab.alienModule);

    let habs = [...unsortedHabs];

    habs.sort((a, b) => {
        if (a.coreModule) {
            return -1;
        } else if (b.coreModule) {
            return 1;
        }

        return a.friendlyName.localeCompare(b.friendlyName);
    });

    const habsList = habs.map(hab => {
        let removable = true;
        if (hab.coreModule) {
            removable = false;
        }

        return <Hab key={uuidv4()} hab={hab} removable={removable}/>;
    });

    const allowDropHandler = (e) => {
        e.preventDefault();
    }

    const onDropHandler = (e) => {
        if (draggedItemType !== ITEM_TYPE_HAB) {
            return;
        }

        dispatch(baseActions.addHabToBase({
            hab: draggedItem,
        }));
        dispatch(dndActions.drop({
            item:       props.hab,
            targetType: TARGET_TYPE_BASE,
        }))
    }

    const habTierChanged = (e) => {
        dispatch(baseActions.updateCore({
            dataName: e.target.value,
        }));
    }

    const habCoreList = coreHabs.map(hab => {
        return <MenuItem key={hab.dataName} value={hab.dataName}>{hab.friendlyName}</MenuItem>;
    });

    const filters = {
        defensesPowered: defensesPowered,
    }

    const defensesPoweredChangeHandler = (e) => {
        setDefensesPowered(e.target.checked);
    }

    return (
        <Box sx={{border: 1, m: 1, p: 1}}
             onDragOver={allowDropHandler}
             onDrop={onDropHandler}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <h1>Base</h1>
                </Grid>
                <Grid item xs={10}>
                    <FormControl>
                        <InputLabel id="tier-filter-label">Tier</InputLabel>
                        <Select
                            id="tier-select"
                            labelId="tier-filter-label"
                            label={'Core Module'}
                            value={habCore}
                            onChange={habTierChanged}
                        >
                            {habCoreList}
                        </Select>
                    </FormControl>
                    <FormControlLabel control={<Switch checked={filters.defensesPowered}/>}
                                      label={'Space Defenses Powered'}
                                      onChange={defensesPoweredChangeHandler}
                                      labelPlacement="top"/>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                {habsList}
            </Grid>
            <Summary habs={habs} defensesPowered={filters.defensesPowered}/>
        </Box>
    );
}

export default Base;