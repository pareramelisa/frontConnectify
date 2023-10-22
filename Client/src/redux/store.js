import { configureStore } from "@reduxjs/toolkit";
import adsSlice from "./Slices/adsSlice";
import professionalSlice from "./Slices/professionalSlice";
import userLoginSlice from "./Slices/loginSlice";
import userRegisterSlice from "./Slices/loginSlice";

export default configureStore({
  reducer: {
    ads: adsSlice,
    professionals: professionalSlice,
    usersLogin: userLoginSlice,
    usersRegister: userRegisterSlice,
  },
});
