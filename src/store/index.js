import {configureStore} from '@reduxjs/toolkit';
import baseSlice from './base-slice';
import dndSlice from './dnd-slice';

const store = configureStore(
    {
        reducer: {base: baseSlice.reducer, dnd: dndSlice.reducer},
    },
)

export default store;