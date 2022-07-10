// Store/Reducers/stocks
import {
    SAVE_STAFF_DETAIL,
    
  } from '../actions/staff';
  
  const initialState = {
    staff: [],
  };

  const stocks = (state = initialState, action = {}) => {
    switch (action.type) {
      case SAVE_STAFF_DETAIL:
        return {
          ...state,
          staff: action.staff,
        };
      default:
        return state;
    }
  };

export default staff
