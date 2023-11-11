import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adsSlice from "./Slices/adsSlice";
import professionalSlice from "./Slices/professionalSlice";
import userLoginSlice from "./Slices/loginSlice";
import userRegisterSlice from "./Slices/loginSlice";
import createAdsSlice from "./Slices/createAdsSlice";
import detailSlice from "./Slices/detailSlice";
import persistUserSlice from "./Slices/persistSlice";
import clientSlice from "./Slices/clientSlice";
import loginWithGoogleSlice from "./Slices/loginGoogleSlice";
import favoritesSlice from "./Slices/favoritesSlice";
import commentSlice from "./Slices/commentSlice";
import adsDeleteSlice from "./Slices/adsDeleteSlice";

// Clave y Almacenamiento por defecto
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  ads: adsSlice,
  adsDelete: adsDeleteSlice,
  detail: detailSlice,
  createAds: createAdsSlice,
  professionals: professionalSlice,
  clients: clientSlice,
  usersLogin: userLoginSlice,
  usersRegister: userRegisterSlice,
  persistUser: persistUserSlice,
  googleLogin: loginWithGoogleSlice,
  favorites: favoritesSlice,
  comment: commentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
