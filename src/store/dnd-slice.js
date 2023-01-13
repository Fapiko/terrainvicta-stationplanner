import {createSlice} from '@reduxjs/toolkit';

const clearState = () => {
    return {
        itemType: '',
        item:     {},
    };
}

const dndSlice = createSlice({
    name:         'dnd',
    initialState: clearState(),
    reducers:     {
        startDrag(state, action) {
            state.item     = action.payload.item;
            state.itemType = action.payload.itemType;
        },
        drop(state, action) {
            clearState();
        },
    },
})


export const dndActions = dndSlice.actions;
export default dndSlice;