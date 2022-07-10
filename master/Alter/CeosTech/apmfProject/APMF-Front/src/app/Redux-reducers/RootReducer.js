import { combineReducers } from "@reduxjs/toolkit";

import adminReducer from "../Redux-slices/adminSlice";
import siteReducer from "../Redux-slices/siteSlice";
import newsReducer from "../Redux-slices/newsSlice";

export default combineReducers({
  admin: adminReducer,
  site: siteReducer,
  news: newsReducer,
  
});
