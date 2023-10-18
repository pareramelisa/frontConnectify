import { createSlice } from "@reduxjs/toolkit";

export const adsSlice = createSlice({
    name: "ads",
    initialState: {
        ads: [],
        detail:{}
    },
    reducers: {
        getAllAds: (state, action)=>{
            state.ads= action.payload
        },
        getAdsById: (state, action)=>{
            state.detail= action.payload
    }}
})

export const {getAllAds, getAdsById} = adsSlice.actions

export default adsSlice.reducer