import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./features/cryptoSlice";

export default configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});
