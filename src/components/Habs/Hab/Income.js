import {useState} from 'react';

const Income = (props) => {
    const [expanded, setExpanded] = useState(true);

    const incomeClickHandler = () => {
        setExpanded(!expanded);
    }

    function getIncome(hab) {
        let output = [];
        if (hab.incomeMoney_month > 0) {
            output.push({key: 'money', value: 'Money: ' + hab.incomeMoney_month});
        }

        if (hab.incomeInfluence_month > 0) {
            output.push({key: 'influence', value: 'Influence: ' + hab.incomeInfluence_month});
        }

        if (hab.incomeOps_month > 0) {
            output.push({key: 'ops', value: 'Ops: ' + hab.incomeOps_month});
        }

        if (hab.incomeResearch_month > 0) {
            output.push({key: 'research', value: 'Research: ' + hab.incomeResearch_month});
        }

        if (hab.incomeProjects > 0) {
            output.push({key: 'projects', value: 'Projects: ' + hab.incomeProjects});
        }

        if (hab.incomeNobles_month > 0) {
            output.push({key: 'nobleMetals', value: 'Noble Metals: ' + hab.incomeNobles_month});
        }

        if (hab.incomeFissiles_month > 0) {
            output.push({key: 'fissiles', value: 'Fissiles: ' + hab.incomeFissiles_month});
        }

        if (hab.incomeAntimatter_month > 0) {
            output.push({key: 'antimatter', value: 'Antimatter: ' + hab.incomeAntimatter_month});
        }

        if (hab.incomeExotics_month > 0) {
            output.push({key: 'exotics', value: 'Exotics: ' + hab.incomeExotics_month});
        }

        return output.map(item => <li key={item.key}>{item.value}</li>);
    }

    const income = function () {
        const incomeList = getIncome(props.hab);

        if (incomeList.length === 0) {
            return;
        }

        if (!expanded) {
            return <div onClick={incomeClickHandler}>
                <p>Income</p>
            </div>
        }

        return (
            <div onClick={incomeClickHandler}>
                <p>Income</p>
                {incomeList.length > 0 && <ul>
                    {incomeList}
                </ul>}
            </div>
        );
    }();

    return (
        <>
            {income}
        </>
    );
}

export default Income;