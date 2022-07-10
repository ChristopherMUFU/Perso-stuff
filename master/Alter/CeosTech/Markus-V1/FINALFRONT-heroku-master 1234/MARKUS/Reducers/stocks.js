// Store/Reducers/stocks
import {
    SAVE_INGREDIENT_ID,
    SAVE_INGREDIENTS
  } from '../actions/stocks';
  
  const initialState = {
    IngredId: '',
    ingredients: [],
  };

  const stocks = (state = initialState, action = {}) => {
    switch (action.type) {
      case SAVE_INGREDIENT_ID:
        return {
          ...state,
          IngredId: action.IngredId,
        };
      case SAVE_INGREDIENTS:
        return {
          ...state,
          ingredients: action.ingredients,
        };
      default:
        return state;
    }
  };

export default stocks