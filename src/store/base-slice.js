import {createSlice} from '@reduxjs/toolkit';
import habsJson from '../data/TIHabModuleTemplate.json';

const baseSlice = createSlice({
    name:         'base',
    initialState: {
        habs:    [habsJson.find(hab => hab.dataName === 'ColonyCore')],
        habCore: 'ColonyCore',
    },
    reducers:     {
        setHabsFromDataNames(state, action) {
            const payloadHabs = action.payload.habs;

            var habs = [];
            for (const habDataName in payloadHabs) {
                console.log(habDataName);
                const numHabs = payloadHabs[habDataName];

                for (let i = 0; i < numHabs; i++) {
                    const hab = habsJson.find(hab => hab.dataName === habDataName);
                    habs.push(hab);
                }
            }

            console.log(habs);

            state.habs = habs;
        },
        addHabToBase(state, action) {
            state.habs.push(action.payload.hab);
        },
        removeHabFromBase(state, action) {
            const index = state.habs.findIndex(hab => hab.dataName === action.payload.hab.dataName);

            if (index > -1) {
                state.habs.splice(index, 1);
            }
        },
        updateCore(state, action) {
            const coreName = action.payload.dataName;
            state.habCore  = coreName;

            const newCore = habsJson.find(hab => hab.dataName === coreName)

            const oldCoreIndex = state.habs.findIndex(hab => hab.coreModule);
            if (oldCoreIndex > -1) {
                state.habs.splice(oldCoreIndex, 1);
            }

            state.habs.push(newCore);
        },
    },
});

export const baseActions = baseSlice.actions;
export default baseSlice;
