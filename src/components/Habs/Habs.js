import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
} from '@mui/material';
import Hab from './Hab/Hab';
import modulesJson from '../../data/TIHabModuleTemplate.json';
import {useState} from 'react';

function createHab(hab) {
    return <Hab key={hab.dataName} hab={hab}/>;
}

const buildableHabs = modulesJson.filter(module => !module.alienModule &&
    !module.destroyed &&
    !module.coreModule);

buildableHabs.sort((a, b) => a.friendlyName.localeCompare(b.friendlyName));

const Habs = (props) => {
    const [powerFilter, setPowerFilter]                       = useState(true);
    const [farmsFilter, setFarmsFilter]                       = useState(true);
    const [tierFilter, setTierFilter]                         = useState(3);
    const [shipyardsFilter, setShipyardsFilter]               = useState(true);
    const [defencesFilter, setDefencesFilter]                 = useState(true);
    const [minesFilter, setMinesFilter]                       = useState(true);
    const [researchFilter, setResearchFilter]                 = useState(true);
    const [moneyIncomeFilter, setMoneyIncomeFilter]           = useState(true);
    const [opsIncomeFilter, setOpsIncomeFilter]               = useState(true);
    const [influenceIncomeFilter, setInfluenceIncomeFilter]   = useState(true);
    const [antimatterIncomeFilter, setAntimatterIncomeFilter] = useState(true);

    const powerFilterClickedHandler = (e) => {
        setPowerFilter(e.target.checked);
    }

    const farmsFilterClickedHandler = (e) => {
        setFarmsFilter(e.target.checked);
    }

    const tierFilterChangedHandler = (e) => {
        setTierFilter(e.target.value);
    }

    const shipyardsFilterClickedHandler = (e) => {
        setShipyardsFilter(e.target.checked);
    }

    const minesFilterClickedHandler = (e) => {
        setMinesFilter(e.target.checked);
    }

    const defencesFilterClickedHandler = (e) => {
        setDefencesFilter(e.target.checked);
    }

    const researchFilterClickedHandler = (e) => {
        setResearchFilter(e.target.checked);
    }

    const moneyIncomeFilterClickedHandler = (e) => {
        setMoneyIncomeFilter(e.target.checked);
    }

    const opsIncomeFilterClickedHandler = (e) => {
        setOpsIncomeFilter(e.target.checked);
    }

    const antimatterIncomeFilterClickedHandler = (e) => {
        setAntimatterIncomeFilter(e.target.checked);
    }

    const influenceIncomeFilterClickedHandler = (e) => {
        setInfluenceIncomeFilter(e.target.checked);
    }

    const filters = {
        power:      powerFilter,
        farms:      farmsFilter,
        tier:       tierFilter,
        shipyards:  shipyardsFilter,
        defences:   defencesFilter,
        mines:      minesFilter,
        research:   researchFilter,
        money:      moneyIncomeFilter,
        ops:        opsIncomeFilter,
        influence:  influenceIncomeFilter,
        antimatter: antimatterIncomeFilter,
    }

    const toggleAllFiltersClickedHandler = (e) => {
        const value = e.target.value === 'true';

        console.log(value);

        setPowerFilter(value);
        setFarmsFilter(value);
        setShipyardsFilter(value);
        setDefencesFilter(value);
        setMinesFilter(value);
        setResearchFilter(value);
        setMoneyIncomeFilter(value);
        setOpsIncomeFilter(value);
        setInfluenceIncomeFilter(value);
        setAntimatterIncomeFilter(value);
    }

    const filterModules = (habs, filters) => {
        return habs.filter(hab => {
                let habTypeFound = false;
                if (filters.power && hab.power > 0) {
                    habTypeFound = true;
                }

                if (filters.farms && hab.specialRules.includes('Farm')) {
                    habTypeFound = true;
                }

                if (filters.shipyards && hab.allowsShipConstruction) {
                    habTypeFound = true;
                }

                if (filters.defences &&
                    (hab.spaceCombatValue > 0 || hab.specialRules.includes('DropTroops'))) {
                    habTypeFound = true;
                }

                if (filters.mines && hab.mine) {
                    habTypeFound = true;
                }

                if (filters.research && hab.incomeResearch_month > 0) {
                    habTypeFound = true;
                }

                if (filters.money && hab.incomeMoney_month > 0) {
                    habTypeFound = true;
                }

                if (filters.ops && hab.incomeOps_month > 0) {
                    habTypeFound = true;
                }

                if (filters.influence && hab.incomeInfluence_month > 0) {
                    habTypeFound = true;
                }

                if (filters.antimatter &&
                    (hab.incomeAntimatter_month >
                        0 ||
                        hab.specialRules.includes('HarvestAntimatter'))) {
                    habTypeFound = true;
                }

                if (!habTypeFound) {
                    return false;
                }

                let tierFound = false;
                if (filters.tier === 0 || filters.tier === hab.tier) {
                    tierFound = true;
                }

                if (!tierFound) {
                    return false;
                }

                return true;
            },
        )
    }

    const filteredHabs = filterModules(buildableHabs, filters);
    const habsList     = filteredHabs.map(hab => {
        return createHab(hab);
    });

    return (
        <Box>
            <Grid container spacing={1}>
                {habsList}
            </Grid>
            <Box sx={{m: 1, p: 1}}>
                <ButtonGroup
                    disableElevation
                    variant="contained">
                    <p>Toggle All</p>
                    <Button value={true} onClick={toggleAllFiltersClickedHandler}>On</Button>
                    <Button value={false} onClick={toggleAllFiltersClickedHandler}>Off</Button>
                </ButtonGroup>
            </Box>
            <Box sx={{m: 1, p: 1}}>
                <FormControlLabel control={<Switch checked={filters.power}/>}
                                  label={'Power'}
                                  onChange={powerFilterClickedHandler}
                                  labelPlacement="bottom"/>
                <FormControlLabel control={<Switch checked={filters.farms}/>}
                                  label={'Farms'}
                                  onChange={farmsFilterClickedHandler}
                                  labelPlacement="bottom"/>
                <FormControlLabel control={<Switch checked={filters.shipyards}/>}
                                  label={'Shipyards'}
                                  onChange={shipyardsFilterClickedHandler}
                                  labelPlacement="bottom"/>
                <FormControlLabel control={<Switch checked={filters.defences}/>}
                                  label={'Defences'}
                                  onChange={defencesFilterClickedHandler}
                                  labelPlacement="bottom"/>
                <FormControlLabel control={<Switch checked={filters.mines}/>}
                                  label={'Mines'}
                                  onChange={minesFilterClickedHandler}
                                  labelPlacement="bottom"/>
                <FormControlLabel control={<Switch checked={filters.research}/>}
                                  label={'Research Income'}
                                  onChange={researchFilterClickedHandler}
                                  labelPlacement="bottom"/>
                <FormControlLabel control={<Switch checked={filters.money}/>}
                                  label={'Money Income'}
                                  onChange={moneyIncomeFilterClickedHandler}
                                  labelPlacement="bottom"/>
                <FormControlLabel control={<Switch checked={filters.ops}/>}
                                  label={'Ops Income'}
                                  onChange={opsIncomeFilterClickedHandler}
                                  labelPlacement="bottom"/>
                <FormControlLabel control={<Switch checked={filters.influence}/>}
                                  label={'Influence Income'}
                                  onChange={influenceIncomeFilterClickedHandler}
                                  labelPlacement="bottom"/>
                <FormControlLabel control={<Switch checked={filters.antimatter}/>}
                                  label={'Antimatter Income'}
                                  onChange={antimatterIncomeFilterClickedHandler}
                                  labelPlacement="bottom"/>

                <FormControl>
                    <InputLabel id="tier-filter-label">Tier</InputLabel>
                    <Select
                        id="tier-select"
                        labelId="tier-filter-label"
                        value={filters.tier}
                        label={'Hab Tier'}
                        onChange={tierFilterChangedHandler}>
                        <MenuItem value={0}>All Tiers</MenuItem>
                        <MenuItem value={1}>Tier 1</MenuItem>
                        <MenuItem value={2}>Tier 2</MenuItem>
                        <MenuItem value={3}>Tier 3</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}

export default Habs;