import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const NewUser = {
    userinfo:{},
    userid: "",
    isRegistered: false,
    isEmail: false,
    isprediction:false,
    predictedData: {},
    isLoader:false,
}
const Api = process.env.REACT_APP_API_URL;
// const Api = 'http://localhost:8088';



export const getUser = createAsyncThunk('admin/getUser',
    async () => {

        try {
            const userData = localStorage.getItem("idtity")
            const response = await axios.get(`${Api}/admininfo`,{
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

export const prediction = createAsyncThunk('admin/prediction',
    async (data) => {
        try {
            const response = await axios.post(`${Api}/prediction`,data);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);


export const createUser = createAsyncThunk('admin/createUser',
    async (userData) => {
        try {
            const response = await axios.post(`${Api}/AdminLogin`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
)

export const otpVerification = createAsyncThunk('admin/otpVerification',
    async (otpData) => {
        try {
            const response = await axios.post(`${Api}/otpmverify`, otpData);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
)

export const setEmail = createAsyncThunk('admin/setEmail',
    async (emailData) => {
        try {
            const response = await axios.post(`${Api}/emailverify`, emailData,{
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

export const emailVerification = createAsyncThunk('admin/emailVerification',
    async (emailData) => {
        try {
            const response = await axios.post(`${Api}/otpeverify`, emailData);
            return response.data;
        }catch (error){
            throw new Error(error.message);
        }
    }
)

const newAdminSlice = createSlice({
    name: 'admin',
    initialState: NewUser,
    reducers: {
        setMlItems:(state)=>{
            state.predictedData = {};
            state.isprediction = false;
        }
    },
    extraReducers: (buider)=>{
        buider
            .addCase(getUser.fulfilled,(state, action)=>{
                state.userinfo = action.payload;
            })
            .addCase(prediction.pending, (state)=>{
                state.isLoader = true;
            })
            .addCase(prediction.fulfilled, (state, action)=>{
                state.isprediction = true;
                state.isLoader = false;
                state.predictedData = action.payload;
            })
            .addCase(createUser.fulfilled, (state,action)=>{
                localStorage.setItem('idtity', action.payload.userid);
                state.userid = action.payload.userid;
            })
            .addCase(otpVerification.fulfilled, (state,action)=>{
                localStorage.setItem('jwt_token', action.payload.token);
                localStorage.setItem('stage', action.payload.stage);
                state.isRegistered = true;
            })
            .addCase(setEmail.fulfilled, (state,action)=>{
                // state.email = action.payload.emailAddress;
            })
            .addCase(emailVerification.fulfilled, (state, action)=>{
                localStorage.setItem('stage', 'second');
                state.isEmail = true;
            })
    },
})

export const {setMlItems} = newAdminSlice.actions;

export default newAdminSlice.reducer;