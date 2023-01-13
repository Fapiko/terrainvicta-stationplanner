const Upkeep = (props) => {
    function getUpkeep(supportMaterialsMonthly) {
        let output = [];
        if (supportMaterialsMonthly.money > 0) {
            output.push("Money: " + supportMaterialsMonthly.money);
        }

        if (supportMaterialsMonthly.boost > 0) {
            output.push("Boost: " + supportMaterialsMonthly.boost);
        }

        if (supportMaterialsMonthly.water > 0) {
            output.push("Water: " + supportMaterialsMonthly.water);
        }

        if (supportMaterialsMonthly.volatiles > 0) {
            output.push("Volatiles: " + supportMaterialsMonthly.volatiles);
        }

        if (supportMaterialsMonthly.metals > 0) {
            output.push("Metals: " + supportMaterialsMonthly.metals);
        }

        if (supportMaterialsMonthly.nobleMetals > 0) {
            output.push("Noble Metals: " + supportMaterialsMonthly.nobleMetals);
        }

        if (supportMaterialsMonthly.fissiles > 0) {
            output.push("Fissiles: " + supportMaterialsMonthly.fissiles);
        }

        return output.map(item => <li>{item}</li>);
    }

    const upkeep = function () {
        const upkeepList = getUpkeep(props.supportMaterialsMonthly);

        if (upkeepList.length === 0) {
            return;
        }

        return (
            <>
                <p>Upkeep</p>
                {upkeepList.length > 0 && <ul>
                    {upkeepList}
                </ul>}
            </>
        );
    }();

    return <>
        {upkeep}
        </>;
}

export default Upkeep;