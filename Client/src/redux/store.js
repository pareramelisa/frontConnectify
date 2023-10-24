import { configureStore } from '@reduxjs/toolkit';
import adsSlice from './Slices/adsSlice';
import professionalSlice from './Slices/professionalSlice';
import userLoginSlice from './Slices/loginSlice';
import userRegisterSlice from './Slices/loginSlice';
import createAdsSlice from './Slices/createAdsSlice';
import searchReducer from './Slices/searchSlice';
import detailSlice from './Slices/detailSlice';

export default configureStore({
  reducer: {
    ads: adsSlice,
    detail: detailSlice,
    createAds: createAdsSlice,
    professionals: professionalSlice,
    usersLogin: userLoginSlice,
    usersRegister: userRegisterSlice,
    search: searchReducer,
  },
});
