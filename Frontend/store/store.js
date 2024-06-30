import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";
import { persistReducer } from "redux-persist";

// Redux persist config
let persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combinig all reducers
let rootReducer = combineReducers({
  cart: cartSlice,
  wishlist: wishlistSlice,
});

// Custom Middlewares

let persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
