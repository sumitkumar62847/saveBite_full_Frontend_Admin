import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const newRest = {
    restinfo :{},
    isfssaiveild: false,
    isRegistered: false,
    addressinfo:{},
    isAddress: false,
    map_address:{},
    isAddresses: false,
}


const Api = 'https://savebite-full-version-server.onrender.com';


export const getRestData = createAsyncThunk('admin/getRestData',
    async () => {
        try {
            const userData = localStorage.getItem("idtity")
            const response = await axios.get(`${Api}/restinfo`,{
                params:{
                    userid:`${userData}`,
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const getAddressData = createAsyncThunk('admin/getAddressData',
    async () => {
        try {
            const userData = localStorage.getItem("idtity")
            const response = await axios.get(`${Api}/restaddressinfo`,{
                params:{
                    userid:`${userData}`,
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const getMapData = createAsyncThunk('admin/getMapData',
    async () => {
        try {
            const userData = localStorage.getItem("idtity")
            const response = await axios.get(`${Api}/restmapinfo`,{
                params:{
                    userid:`${userData}`,
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);




export const createRestaurantData = createAsyncThunk('restaurant/createRestaurantData',
     async (RestData) => {
        try {
            const response = await axios.post(`${Api}/restdetail`,RestData,{
                headers: {
                    'Authorization': 'Bearer '+ localStorage.getItem('jwt_token'),
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
     }
);


export const createRestaurantAddress = createAsyncThunk('restaurant/createRestaurantAddress',
    async (addressData) => {
        try {
            const response = await axios.post(`${Api}/restaddress`,addressData,{
                headers: {
                    'Authorization': 'Bearer '+ localStorage.getItem('jwt_token'),
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
)
export const createRestMapAddress = createAsyncThunk('restaddress/createRestMapAddress',
    async (mapAddressData) => {
        try {
            const response = await axios.post(`${Api}/mapaddress`,mapAddressData,{
                headers: {
                    'Authorization': 'Bearer '+ localStorage.getItem('jwt_token'),
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
)


const restRegister = createSlice({
    name:'restaurant',
    initialState: newRest,
    reducers: {},
    extraReducers: (builder)=>{
        builder
           .addCase(getRestData.fulfilled, (state,action)=>{
                state.restinfo = action.payload;
            })
            .addCase(getAddressData.fulfilled,(state, action)=>{
                state.addressinfo = action.payload;
            })
            
            .addCase(getMapData.fulfilled, (state,action)=>{
                state.restinfo = action.payload;
            })



            .addCase(createRestaurantData.fulfilled, (state,action)=>{
                localStorage.setItem('stage', 'thrid');
                state.isRegistered = true;
            })
            
            .addCase(createRestaurantAddress.fulfilled, (state)=>{
                localStorage.setItem('stage', 'fourth');
                state.isAddress = true;
            })
            .addCase(createRestMapAddress.fulfilled, (state)=>{
                localStorage.setItem('stage', 'fifth');
                state.isAddresses = true;
            })
    }
});

export default restRegister.reducer;

     