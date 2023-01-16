import {createSlice} from '@reduxjs/toolkit';

const basesSlice = createSlice({
    name:         'bases',
    initialState: {
        list: [],
    },
    reducers:     {
        addBase(state, action) {
            // Check for base with existing name - overwrite if exists
            let existingBaseIndex = state.list.findIndex(base => base.name === action.payload.name);

            if (existingBaseIndex > -1) {
                state.list[existingBaseIndex] = action.payload;
            } else {
                state.list.push(action.payload);
            }
        },
        removeBase(state, action) {
            const index = state.list.findIndex(base => base.name === action.payload.name);

            if (index > -1) {
                state.list.splice(index, 1);
            }
        },
    },
});

export const basesActions = basesSlice.actions;
export default basesSlice;
