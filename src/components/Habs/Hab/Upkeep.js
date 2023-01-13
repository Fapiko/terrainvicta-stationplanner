import {useState} from 'react';

const Upkeep = (props) => {
    const [expanded, setExpanded] = useState(true);

    const upkeepClickHandler = () => {
        setExpanded(!expanded);
    }

    function getUpkeep(supportMaterialsMonthly) {
        let output = [];
        if (supportMaterialsMonthly.money > 0) {
            output.push({key: 'money', value: 'Money: ' + supportMaterialsMonthly.money});
        }

        if (supportMaterialsMonthly.boost > 0) {
            output.push({key: 'boost', value: 'Boost: ' + supportMaterialsMonthly.boost});
        }

        if (supportMaterialsMonthly.water > 0) {
            output.push({key: 'water', value: 'Water: ' + supportMaterialsMonthly.water});
        }

        if (supportMaterialsMonthly.volatiles > 0) {
            output.push({
                key:   'volatiles',
                value: 'Volatiles: ' + supportMaterialsMonthly.volatiles,
            });
        }

        if (supportMaterialsMonthly.metals > 0) {
            output.push({key: 'metals', value: 'Metals: ' + supportMaterialsMonthly.metals});
        }

        if (supportMaterialsMonthly.nobleMetals > 0) {
            output.push({
                key:   'nobleMetals',
                value: 'Noble Metals: ' + supportMaterialsMonthly.nobleMetals,
            });
        }

        if (supportMaterialsMonthly.fissiles > 0) {
            output.push({key: 'fissiles', value: 'Fissiles: ' + supportMaterialsMonthly.fissiles});
        }

        return output.map(item => <li key={item.key}>{item.value}</li>);
    }

    const upkeep = function () {
        const upkeepList = getUpkeep(props.supportMaterialsMonthly);

        if (upkeepList.length === 0) {
            return;
        }

        if (!expanded) {
            return <div onClick={upkeepClickHandler}><p>Upkeep</p></div>
        }

        return (
            <div onClick={upkeepClickHandler}>
                <p>Upkeep</p>
                {upkeepList.length > 0 && <ul>
                    {upkeepList}
                </ul>}
            </div>
        );
    }();

    return <>
        {upkeep}
    </>;
}

export default Upkeep;