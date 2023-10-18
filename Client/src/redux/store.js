import { configureStore } from "@reduxjs/toolkit";
import ads from "./actions/adsSlice";
import professionals from "./actions/professionalSlice";

export default configureStore({
  reducer: {
    ads: ads,
    professionals: professionals,
  },
});
