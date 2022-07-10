import { createSlice } from "@reduxjs/toolkit";

// Slice for the menus of the site

// export const Global_admin = () => {
//   const [global_admin, setGlobal_admin] = useState(false);
// };
// *  Writing the Slices
//+ createSlice returns a "slice" object that contains the generated reducer function as a field named reducer,
//+ and the generated action creators inside an object called actions.
export const siteSlice = createSlice({
  name: "site",
  initialState: {   
    subMenuId: 1,
  },
  reducers: {
    setSubMenuId: (state, action) => {
        state.subMenuId = action.payload;
    },
    resetSubMenuId: (state, action) => {
        state.subMenuId = 1;
    },
  },
});

//+ generated action creator functions :return an object with payload and type
export const { setSubMenuId, resetSubMenuId } = siteSlice.actions;

export const getSiteState = (state) => state.site;

// + the generated reducer function
export default siteSlice.reducer;
