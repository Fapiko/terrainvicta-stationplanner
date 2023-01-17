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
        let quantity = hab.quantity;
        if (quantity === undefined) {
            quantity = 1;
        }
        for (let i = 0; i < quantity; i++) {
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
            {Item('Power', power)}
            {Item('Crew', crew)}
            {Item('Boost', boost)}
            {Item('Money', products.money)}
            {Item('Volatiles', volatiles)}
            {Item('Water', water)}
            {Item('Metals', metals)}
            {Item('Noble Metals:', products.nobleMetals)}
            {Item('Influence', products.influence)}
            {Item('Ops', products.ops)}
            {Item('Research', products.research)}
            {Item('Projects', products.projects)}
            {Item('Mission Control', missionControl)}
            {Item('Fissiles', products.fissiles)}
            {Item('Antimatter', products.antimatter)}
        </List>
    )
}

export default Summary;