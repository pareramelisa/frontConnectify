import { configureStore } from "@reduxjs/toolkit";
import ads from "./adsSlice";
import professionals from "./professionalSlice";

export default configureStore({
  reducer: {
    ads: ads,
    professionals: professionals,
  },
});
