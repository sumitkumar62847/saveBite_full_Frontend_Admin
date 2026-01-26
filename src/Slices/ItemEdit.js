import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const item_details = {
    edititem:{},
    editItemId:'',
    isLoader:false,
    isUploaded: false,
}

const Api = process.env.REACT_APP_API_URL;
// const Api = 'http://localhost:8088';



export const getEditItem = createAsyncThunk('itemedit/editItem',
    async (data)=>{
        try{
            const response = await axios.get(`${Api}/getedititem`,{
                params:{
                    itemid:`${data.itemid}`,
                }
            });
            return response.data.items;
        }catch(err){
            throw new Error(err.message);
        }
    }
);
export const UpdataItem = createAsyncThunk('itemedit/edititem',
    async (data) =>{
        try{ 
            const response = await axios.patch(`${Api}/updataitem`,{data});
            return response.data;
        }catch(err){
            throw new Error(err.message);            
        }
    }
)

const itemEdit = createSlice({
    name:'itemedit',
    initialState: item_details,
    reducers: {
        editItemId:(state,action)=>{
            state.editItemId = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getEditItem.fulfilled, (state, action)=>{
                state.edititem = action.payload
                state.isLoader = false;
            })
            .addCase(UpdataItem.pending, (state)=>{
                state.isLoader = true;
            })
            .addCase(UpdataItem.fulfilled, (state)=>{
                state.isUploaded = true;
                state.isLoader = false;
            })
    }
})

export const {editItemId} = itemEdit.actions;

export default itemEdit.reducer;
