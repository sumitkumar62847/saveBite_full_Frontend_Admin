import { configureStore } from "@reduxjs/toolkit";
import adminReducer from '../Slices/RegisterSlice.js';
import RestaurantReducer from '../Slices/ResraurantDataSlice.js';
import ItemReducer from '../Slices/ItemUpload.js';

const store = configureStore({
    reducer: {
        admin: adminReducer,
        restaurant: RestaurantReducer,
        items: ItemReducer
    },
 
})
export default store;