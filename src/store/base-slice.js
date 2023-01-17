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
                const numHabs = payloadHabs[habDataName];

                const hab = {
                    ...habsJson.find(hab => hab.dataName === habDataName),
                    quantity: numHabs
                };
                habs.push(hab);
            }

            state.habs = habs;
        },
        addHabToBase(state, action) {
            const existingHab = state.habs.find(hab => hab.dataName ===
                action.payload.hab.dataName);

            console.log(action.payload);
            if (existingHab !== undefined) {
                existingHab.quantity += action.payload.quantity;
            } else {
                state.habs.push({...action.payload.hab, quantity: action.payload.quantity});
            }
        },
        clearHabs(state, action) {
            state.habs.splice(1);
        },
        removeHabFromBase(state, action) {
            const index = state.habs.findIndex(hab => hab.dataName === action.payload.hab.dataName);

            if (index > -1) {
                const hab = state.habs[index];
                if (hab.quantity > 1) {
                    hab.quantity -= action.payload.quantity;
                } else {
                    state.habs.splice(index, 1);
                }
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
