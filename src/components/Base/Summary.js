import {INCOME_CURRENCY_MAP, PRODUCTS, SUPPORT_MATERIALS} from '../../constants/habs';
import {List, ListItem, ListItemText} from '@mui/material';

const Summary = (props) => {
    let products = {};

    PRODUCTS.forEach((product) => {
        products[product] = 0;
    });

    const getGrossIncome = (currency, hab) => {
        let value = 0;

        value += hab[INCOME_CURRENCY_MAP[currency]];

        const supportCost = hab[SUPPORT_MATERIALS][currency];
        if (supportCost !== undefined) {
            value -= supportCost;
        }

        return value;
    }

    let power          = 0;
    let missionControl = 0;
    let boost          = 0;
    let crew           = 0;
    let water          = 0;
    let volatiles      = 0;
    let metals         = 0;
    props.habs.forEach(hab => {
        for (let i = 0; i < hab.quantity; i++) {
            crew += hab.crew;

            if (props.defensesPowered || hab.spaceCombatValue === 0) {
                if (hab.specialRules.includes('Solar_Power_Variable_Output')) {
                    power += hab.power * props.solarMultiplier;
                } else {
                    power += hab.power;
                }
            }
            missionControl += hab.missionControl;
            boost -= hab[SUPPORT_MATERIALS].boost;
            water -= hab[SUPPORT_MATERIALS].water;
            volatiles -= hab[SUPPORT_MATERIALS].volatiles;
            metals -= hab[SUPPORT_MATERIALS].metals;

            PRODUCTS.forEach(product => {
                products[product] += getGrossIncome(product, hab);
            });
        }
    });

    let supportedCrew = 0;
    props.habs.filter(hab => {
        if (hab.specialRules.includes('Farm')) {
            return true;
        }

        return false;
    }).forEach(farm => {
        supportedCrew += farm.specialRulesValue * farm.quantity;
    });

    // const unsupportedCrew = Math.max(crew - supportedCrew, 0);

    // Turns out that farm support applies to overall usage of water/volatiles, not just crew.
    // Keeping this for if/when this is fixed.
    // volatiles -= unsupportedCrew * .029;
    // water -= unsupportedCrew * .029;

    volatiles -= crew * .029;
    water -= crew * .029;

    volatiles = Math.min(volatiles + supportedCrew * .029, 0);
    water     = Math.min(water + supportedCrew * .029, 0);

    function Item(label, value) {
        if (value === 0) {
            return null;
        }

        return (
            <ListItem>
                <ListItemText primary={`${label}: ${value}`}/>
            </ListItem>
        );
    }

    return (
        <List>
            <ListItem>
                <ListItemText primary={`Power: ${power}`}/>
            </ListItem>
            <ListItem>
                <ListItemText primary={`Crew: ${crew} (${supportedCrew})`}/>
            </ListItem>
            {Item('Boost', boost)}
            {Item('Money', products.money)}
            {volatiles !== 0 && <ListItem>Volatiles: {volatiles}</ListItem>}
            {water !== 0 && <ListItem>Water: {water}</ListItem>}
            {metals !== 0 && <ListItem>Metals: {metals}</ListItem>}
            {products.nobleMetals !==
            0 &&
            <ListItem>Noble Metals: {products.nobleMetals}</ListItem>}
            {products.influence !== 0 && <ListItem>Influence: {products.influence}</ListItem>}
            {products.ops !== 0 && <ListItem>Ops: {products.ops}</ListItem>}
            {products.research !== 0 && <ListItem>Research: {products.research}</ListItem>}
            {products.projects !== 0 && <ListItem>Projects: {products.projects}</ListItem>}
            {missionControl !== 0 && <ListItem>Mission Control: {missionControl}</ListItem>}
            {products.fissiles !== 0 && <ListItem>Fissiles: {products.fissiles}</ListItem>}
            {products.antimatter !==
            0 &&
            <ListItem>Antimatter: {products.antimatter}</ListItem>}
        </List>
    )
}

export default Summary;