import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adsSlice from "./Slices/adsSlice";
import professionalSlice from "./Slices/professionalSlice";
import userLoginSlice from "./Slices/loginSlice";
import userRegisterSlice from "./Slices/loginSlice";
import createAdsSlice from "./Slices/createAdsSlice";
import searchReducer from "./Slices/searchSlice";
import detailSlice from "./Slices/detailSlice";
import persistUserSlice from "./Slices/persistSlice";

// Clave y Almacenamiento por defecto
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  ads: adsSlice,
  detail: detailSlice,
  createAds: createAdsSlice,
  professionals: professionalSlice,
  usersLogin: userLoginSlice,
  usersRegister: userRegisterSlice,
  search: searchReducer,
  persistUser: persistUserSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
