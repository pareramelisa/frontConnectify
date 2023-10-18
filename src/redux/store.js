import { configureStore } from "@reduxjs/toolkit";
import professionals from "./professionalSlice";
export default configureStore({
  reducer: {
    professionals: professionals,
  },
});
