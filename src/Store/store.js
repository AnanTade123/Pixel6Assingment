import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { employeeSlice } from "../Slice/slice";

const store = configureStore({
    reducer: {
        [employeeSlice.reducerPath]: employeeSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employeeSlice.middleware)
});

setupListeners(store.dispatch);

export default store;
