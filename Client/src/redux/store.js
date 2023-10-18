import { configureStore } from "@reduxjs/toolkit";
import ads from "./adsSlice"

export default configureStore({
    reducer: {
          ads:ads
    }
})