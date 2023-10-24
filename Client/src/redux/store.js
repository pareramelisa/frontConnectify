import { configureStore } from "@reduxjs/toolkit";
import adsSlice from "./Slices/adsSlice";
import professionalSlice from "./Slices/professionalSlice";
import userLoginSlice from "./Slices/loginSlice";
import userRegisterSlice from "./Slices/loginSlice";
import createAdsSlice from "./Slices/createAdsSlice"
import searchReducer from './Slices/searchSlice';

export default configureStore({
  reducer: {
    ads: adsSlice,
    createAds: createAdsSlice,
    professionals: professionalSlice,
    usersLogin: userLoginSlice,
    usersRegister: userRegisterSlice,
    search:searchReducer,
  },
});
