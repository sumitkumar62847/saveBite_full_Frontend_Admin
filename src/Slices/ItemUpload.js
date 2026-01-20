import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const item_details = {
    items:[],
    isLoader:false,
    isUploaded: false,
    isLived: false,
}

const Api = process.env.REACT_APP_API_URL;



export const getitems = createAsyncThunk('items/getItems',
    async (data)=>{
        try{
            const response = await axios.get(`${Api}/adminitems`,{
                params:{
                    userid:`${data.userid}`,
                }
            });
            return response.data.items;
        }catch(err){
            throw new Error(err.message);
        }
    }
);
export const itemLive = createAsyncThunk('items/itemlive',
    async (data)=>{
        try{
            const response = await axios.post(`${Api}/itemlive`,data,{
                headers: {
                    'Authorization': 'Bearer '+ localStorage.getItem('jwt_token'),
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }catch(err){
        }
    }
)
export const deleteitem = createAsyncThunk('items/deleteitem',
    async (data)=>{
        try{
            const response = await axios.delete(`${Api}/adminitemdelete`,{
                headers: {
                    'Authorization': 'Bearer '+ localStorage.getItem('jwt_token'),
                    'Content-Type': 'application/json'
                },
                params:{
                    id:`${data.id}`
                }
            });
            return response.data;
        }catch(err){
            throw new Error(err.message)
        }
    }
)

export const createItem = createAsyncThunk('items/createItem',
    async (itemData) =>{
        try{
            const response = await axios.post(`${Api}/itemupload`,itemData,{
                headers: {
                    'Authorization': 'Bearer '+ localStorage.getItem('jwt_token'),
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        }catch(err){
            throw new Error(err.message);
        }
    }
);


const itemDetail = createSlice({
    name:'items',
    initialState: item_details,
    reducers: {},
    extraReducers: (builder)=>{
        builder
           .addCase(createItem.pending, (state)=>{
                state.isLoader = true;
            })
           .addCase(createItem.fulfilled, (state)=>{
                state.isUploaded = true;
                state.isLoader = false;
            })
            .addCase(getitems.pending, (state)=>{
                state.isLoader = true;
            })
            .addCase(getitems.fulfilled, (state, action)=>{
                state.items = action.payload
                state.isLoader = false;
            })
            .addCase(deleteitem.pending,(state)=>{
                state.isLoader = true;
            })
            .addCase(deleteitem.fulfilled,(state,action)=>{
                // console.log(action.payload)
                state.isLoader = false;
            })
            .addCase(itemLive.pending,(state)=>{
                state.isLived = true;
                state.isLoader = true;

            })
            .addCase(itemLive.fulfilled,(state)=>{
                state.isLived = true;
                state.isLoader = false;
            })
    }
})


export default itemDetail.reducer;