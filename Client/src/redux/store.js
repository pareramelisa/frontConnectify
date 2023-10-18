import { configureStore } from "@reduxjs/toolkit";
import adsSlice from "./actions/adsSlice";
import professionalSlice from "./actions/professionalSlice";

export default configureStore({
  reducer: {
    ads: adsSlice,
    professionals: professionalSlice,
  },
});