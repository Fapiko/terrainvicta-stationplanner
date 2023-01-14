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
    props.habs.forEach(hab => {
        crew += hab.crew;
        power += hab.power;
        missionControl += hab.missionControl;
        boost -= hab[SUPPORT_MATERIALS].boost;
        water -= hab[SUPPORT_MATERIALS].water;
        volatiles -= hab[SUPPORT_MATERIALS].volatiles;

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

    const unsupportedCrew = Math.max(crew - supportedCrew, 0);

    volatiles -= unsupportedCrew * .029;
    water -= unsupportedCrew * .029;

    return (
        <ul>
            <li>Power: {power}</li>
            <li>Crew: {crew} ({supportedCrew})</li>
            <li>Boost: {boost}</li>
            <li>Money: {products.money}</li>
            <li>Volatiles: {volatiles}</li>
            <li>Water: {water}</li>
            <li>Influence: {products.influence}</li>
            <li>Ops: {products.ops}</li>
            <li>Research: {products.research}</li>
            <li>Projects: {products.projects}</li>
            <li>Mission Control: {missionControl}</li>
            <li>Nobles: {products.nobles}</li>
            <li>Fissiles: {products.fissiles}</li>
            <li>Exotics: {products.exotics}</li>
            <li>Antimatter: {products.antimatter}</li>
        </ul>
    )
}

export default Summary;