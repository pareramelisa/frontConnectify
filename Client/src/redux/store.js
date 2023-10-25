import { configureStore } from '@reduxjs/toolkit';
import adsSlice from './Slices/adsSlice';
import professionalSlice from './Slices/professionalSlice';
import userLoginSlice from './Slices/loginSlice';
import userRegisterSlice from './Slices/loginSlice';
import createAdsSlice from './Slices/createAdsSlice';
import searchReducer from './Slices/searchSlice';
import detailSlice from './Slices/detailSlice';
import adsFilter from './Slices/adsFilterSlice'

export default configureStore({
  reducer: {
    adsFilter: adsFilter,
    ads: adsSlice,
    detail: detailSlice,
    createAds: createAdsSlice,
    professionals: professionalSlice,
    usersLogin: userLoginSlice,
    usersRegister: userRegisterSlice,
    search: searchReducer,
  },
});
