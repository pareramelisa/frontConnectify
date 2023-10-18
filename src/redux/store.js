import { configureStore } from "@reduxjs/toolkit";
import professionals from "./slice/professionalSlice";
export default configureStore({
  reducer: {
    professionals: professionals,
  },
});
