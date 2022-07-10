// Store/Reducers/stocks
import {
    SAVE_RESTAURANT_OWNER_DETAILS,
    USER_LOGIN,
    USER_CREDENTIALS,
  } from '../actions/accountsData';
  
  const initialState = {
    restaurantOwnerDetails: {},
    connexion: false,
    email: '',
    password: '',
  };

  const accountsData = (state = initialState, action = {}) => {
    switch (action.type) {
      case SAVE_RESTAURANT_OWNER_DETAILS:
        return {
          ...state,
          restaurantOwnerDetails: action.data,
        };
        case USER_LOGIN:
        return {
          ...state,
          connexion: true,
        };
        case USER_CREDENTIALS:
          return {
            ...state,
            email: action.email,
            password: action.password,
          }
      default:
        return state;
    }
  };

export default accountsData