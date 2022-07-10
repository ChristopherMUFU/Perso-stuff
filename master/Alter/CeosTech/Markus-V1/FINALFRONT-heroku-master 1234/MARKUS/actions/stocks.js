export const SAVE_INGREDIENTS = 'SAVE_INGREDIENTS';
export const SAVE_INGREDIENT_ID = 'SAVE_INGREDIENT_ID';

export const saveIngredId = (IngredId) => ({
  type: SAVE_INGREDIENT_ID,
  IngredId,
});

export const saveIngredients = (ingredients) => ({
  type: SAVE_INGREDIENTS,
  ingredients,
});