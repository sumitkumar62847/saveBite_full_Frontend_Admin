import { configureStore } from "@reduxjs/toolkit";
import adminReducer from '../Slices/RegisterSlice.js';
import RestaurantReducer from '../Slices/ResraurantDataSlice.js';
import ItemReducer from '../Slices/ItemUpload.js';
import itemEdit from '../Slices/ItemEdit.js'

const store = configureStore({
    reducer: {
        admin: adminReducer,
        restaurant: RestaurantReducer,
        items: ItemReducer,
        itemedit:itemEdit
    },
 
})
export default store;