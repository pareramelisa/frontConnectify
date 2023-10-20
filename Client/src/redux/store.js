import { configureStore } from "@reduxjs/toolkit";
import adsSlice from "./actions/adsSlice";
import professionalSlice from "./actions/professionalSlice";
import userSlice from "./actions/userSlice";

export default configureStore({
  reducer: {
    ads: adsSlice,
    professionals: professionalSlice,
    user: userSlice,
  },
});