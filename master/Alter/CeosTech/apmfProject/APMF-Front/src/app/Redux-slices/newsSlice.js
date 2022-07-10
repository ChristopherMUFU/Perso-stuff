import { createSlice } from "@reduxjs/toolkit";
import { sendrequest } from "../../middlewares/request";

// Slice for the news of the site

// export const Global_admin = () => {
//   const [global_admin, setGlobal_admin] = useState(false);
// };
// *  Writing the Slices
//+ createSlice returns a "slice" object that contains the generated reducer function as a field named reducer,
//+ and the generated action creators inside an object called actions.
export const newsSlice = createSlice({
  name: "news",
  initialState: {   
    news: [],
    isNewsLoaded: false,
  },
  reducers: {
    // Store datas in state
    setNews: (state, action) => {
        state.news = action.payload;
        state.isNewsLoaded = true;
    },
  },
});

//+ generated action creator functions :return an object with payload and type
const { setNews } = newsSlice.actions;

// Will send the request to the API and then dispatch the result to the reducer.

export const getNews = () => async dispatch => {
    try {
        // Send the request
        const news = await sendrequest('GET', 'articles/');
        const newsData = [...news['data']];
        // Store the datas in the state. Why ? They can be accessible from any page, and if they are modified, the DOM that uses those datas will be automatically updated
        dispatch(setNews({newsData}));
    } catch (e) {
      dispatch(setNews({undefined}));
    }
}

export const getNewsState = (state) => state.news;

// + the generated reducer function
export default newsSlice.reducer;