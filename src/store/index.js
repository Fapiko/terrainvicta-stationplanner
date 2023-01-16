import {configureStore, createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit';
import baseSlice from './base-slice';
import dndSlice from './dnd-slice';
import basesSlice from './bases-slice';

const basesState = JSON.parse(localStorage.getItem('bases') || '{"list": []}');

const localstoreMiddleware = createListenerMiddleware();
localstoreMiddleware.startListening({
    matcher: isAnyOf(basesSlice.actions.addBase, basesSlice.actions.removeBase),
    effect:  (action, listenerApi) => localStorage.setItem('bases',
        JSON.stringify(listenerApi.getState().bases)),
})

const store = configureStore(
    {
        preloadedState: {
            bases: basesState,
        },
        reducer:        {
            bases: basesSlice.reducer,
            base:  baseSlice.reducer,
            dnd:   dndSlice.reducer,
        },
        middleware:     (getDefaultMiddleware) => [
            ...getDefaultMiddleware(),
            localstoreMiddleware.middleware,
        ],
    },
)

export default store;