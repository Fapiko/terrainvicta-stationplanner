import {INCOME_CURRENCY_MAP, PRODUCTS, SUPPORT_MATERIALS} from '../../constants/habs';

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
    });

    let supportedCrew = 0;
    props.habs.filter(hab => {
        if (hab.specialRules.includes('Farm')) {
            return true;
        }

        return false;
    }).forEach(farm => {
        supportedCrew += farm.specialRulesValue;
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

    return (
        <ul>
            <li>Power: {power}</li>
            <li>Crew: {crew} ({supportedCrew})</li>
            {boost !== 0 && <li>Boost: {boost}</li>}
            {products.money !== 0 && <li>Money: {products.money}</li>}
            {volatiles !== 0 && <li>Volatiles: {volatiles}</li>}
            {water !== 0 && <li>Water: {water}</li>}
            {metals !== 0 && <li>Metals: {metals}</li>}
            {products.nobleMetals !== 0 && <li>Noble Metals: {products.nobleMetals}</li>}
            {products.influence !== 0 && <li>Influence: {products.influence}</li>}
            {products.ops !== 0 && <li>Ops: {products.ops}</li>}
            {products.research !== 0 && <li>Research: {products.research}</li>}
            {products.projects !== 0 && <li>Projects: {products.projects}</li>}
            {missionControl !== 0 && <li>Mission Control: {missionControl}</li>}
            {products.fissiles !== 0 && <li>Fissiles: {products.fissiles}</li>}
            {products.antimatter !== 0 && <li>Antimatter: {products.antimatter}</li>}
        </ul>
    )
}

export default Summary;