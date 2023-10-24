import { configureStore } from '@reduxjs/toolkit';
import adsSlice from './Slices/adsSlice';
import professionalSlice from './Slices/professionalSlice';
import userLoginSlice from './Slices/loginSlice';
import userRegisterSlice from './Slices/loginSlice';
import detailSlice from './Slices/detailSlice';

export default configureStore({
  reducer: {
    ads: adsSlice,
    detail: detailSlice,
    professionals: professionalSlice,
    usersLogin: userLoginSlice,
    usersRegister: userRegisterSlice,
  },
});
