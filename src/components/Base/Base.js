import {
    Alert,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Switch,
    TextField,
} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import Hab from '../Habs/Hab/Hab';
import {v4 as uuidv4} from 'uuid';
import {dndActions} from '../../store/dnd-slice';
import {ITEM_TYPE_HAB, TARGET_TYPE_BASE} from '../../store/dnd-constants';
import {baseActions} from '../../store/base-slice';
import Summary from './Summary';
import habsJson from '../../data/TIHabModuleTemplate.json';
import {useCallback, useEffect, useState} from 'react';
import {BODIES_SOLAR_MULTIPLIER_MAP, EARTH} from '../../constants/spaceBodies';
import {
    generateSharingLink,
    generateSharingSlug,
    parseSharingLink,
} from '../../helpers/sharingLink';
import {basesActions} from '../../store/bases-slice';

function maxHabs(tier) {
    switch (tier) {
        case 1:
            return 4;
        case 2:
            return 12;
        case 3:
            return 20;
        default:
            return 4;
    }
}

const Base = (props) => {
    const draggedItem                                         = useSelector(state => state.dnd.item);
    const draggedItemType                                     = useSelector(state => state.dnd.itemType);
    const dispatch                                            = useDispatch();
    const unsortedHabs                                        = useSelector(state => state.base.habs);
    const habCore                                             = useSelector(state => state.base.habCore);
    const [defensesPowered, setDefensesPowered]               = useState(true);
    const [orbitalBody, setOrbitalBody]                       = useState(EARTH);
    const [showLinkCopiedSnackbar, setShowLinkCopiedSnackbar] = useState(false);
    const [baseName, setBaseName]                             = useState('Base');
    const [lastLoadedUrl, setLastLoadedUrl]                   = useState('');
    const [typingBaseName, setTypingBaseName]                 = useState(baseName);

    const url = window.location.href;

    const loadFromUrl = useCallback(
        () => {
            if (url.includes('#share/')) {
                const sharingLink = url.split('#share/')[1];
                const sharingObj  = parseSharingLink(sharingLink);
                dispatch(baseActions.setHabsFromDataNames({habs: sharingObj.habs}));

                setOrbitalBody(sharingObj.body);
                setDefensesPowered(sharingObj.defensesPowered);
                setBaseName(sharingObj.baseName);
                setTypingBaseName(sharingObj.baseName);
            }

            setLastLoadedUrl(url);
        },
        [url, dispatch],
    );

    useEffect(() => {
        window.addEventListener('popstate', loadFromUrl);

        return () => {
            window.removeEventListener('popstate', loadFromUrl);
        };
    }, [loadFromUrl]);

    if (url !== lastLoadedUrl) {
        loadFromUrl();
    }

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
        let countable = true;
        if (hab.coreModule) {
            countable = false;
        }

        return <Hab key={uuidv4()} hab={hab} countable={countable}/>;
    });

    const allowDropHandler = (e) => {
        e.preventDefault();
    }

    const onDropHandler = (e) => {
        if (draggedItemType !== ITEM_TYPE_HAB) {
            return;
        }

        dispatch(baseActions.addHabToBase({
            hab:      {...draggedItem},
            quantity: 1,
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

    const orbitalBodyChanged = (e) => {
        setOrbitalBody(e.target.value);
    }

    const habCoreList = coreHabs.map(hab => {
        return <MenuItem key={hab.dataName} value={hab.dataName}>{hab.friendlyName}</MenuItem>;
    });

    let orbitalBodies = [];
    Object.entries(BODIES_SOLAR_MULTIPLIER_MAP).forEach(([key, value]) => {
        orbitalBodies.push({key: key, value: value});
    });

    const orbitalBodiesList = orbitalBodies.map(body => {
        return <MenuItem key={body.key} value={body.key}>{body.key}</MenuItem>;
    });

    const filters = {
        defensesPowered: defensesPowered,
    }

    const defensesPoweredChangeHandler = (e) => {
        setDefensesPowered(e.target.checked);
    }

    const shareHandler = () => {
        const sharingLink = generateSharingLink(baseName, orbitalBody, habs, defensesPowered);
        navigator.clipboard.writeText(sharingLink);
        setShowLinkCopiedSnackbar(true);
    }

    const clearHandler = () => {
        dispatch(baseActions.clearHabs());
        setTypingBaseName('New Base');
        setBaseName('New Base');
    }

    const baseNameChangedHandler = (e) => {
        setBaseName(e.target.value);
    }

    const baseNameKeyHandler = (e) => {
        if (e.key === 'Enter') {
            baseNameChangedHandler(e);
        }
    }

    const saveHandler = () => {
        const sharingSlug = generateSharingSlug(baseName, orbitalBody, habs, defensesPowered);
        dispatch(basesActions.addBase({
            name: baseName,
            slug: sharingSlug,
        }));
    }

    const habCount = habs.reduce((acc, hab) => {
        console.log(acc);
        if (hab.coreModule) {
            return acc;
        }

        return acc + hab.quantity;
    }, 0);

    return (
        <Box sx={{border: 1, m: 1, p: 1}}
             onDragOver={allowDropHandler}
             onDrop={onDropHandler}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <h1>{baseName} ({habCount}/{maxHabs(habs[0].tier)})</h1>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Base Name"
                               onBlur={baseNameChangedHandler}
                               onKeyDown={baseNameKeyHandler}
                               value={typingBaseName}
                               onChange={(e) => setTypingBaseName(e.target.value)}
                               variant="standard"/>
                    <Button onClick={clearHandler} sx={{ml: 1}} variant={'outlined'}>Clear
                        Base</Button>
                    <Button variant={'outlined'}
                            sx={{m: 1}}
                            onClick={shareHandler}>Share</Button>
                    <Button onClick={saveHandler} variant={'contained'}>Save</Button>
                </Grid>
                <Grid item xs={12} sx={{p: 1}}>
                    <FormControl sx={{p: 1}}>
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
                    <FormControl sx={{p: 1}}>
                        <InputLabel id="tier-filter-label">Orbital Body</InputLabel>
                        <Select
                            sx={{minWidth: '100px'}}
                            id="tier-select"
                            labelId="tier-filter-label"
                            label={'Orbital Body'}
                            value={orbitalBody}
                            onChange={orbitalBodyChanged}
                        >
                            {orbitalBodiesList}
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
            <Summary habs={habs}
                     defensesPowered={filters.defensesPowered}
                     solarMultiplier={BODIES_SOLAR_MULTIPLIER_MAP[orbitalBody]}/>
            <Snackbar
                open={showLinkCopiedSnackbar}
                autoHideDuration={6000}
                message="Note archived"
            >
                <Alert severity="success">
                    Base link copied to clipboard!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Base;