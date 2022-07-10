export const SAVE_RESTAURANT_OWNER_DETAILS = 'SAVE_RESTAURANT_OWNER_DETAILS';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_CREDENTIALS = 'USER_CREDENTIALS';

export const saveRestaurantOwnerDetails = (data) => ({
  type: SAVE_RESTAURANT_OWNER_DETAILS,
  data,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const userLogin = () => ({
  type: USER_LOGIN,
});

export const saveUserCredentials = (email, password) => ({
  type: USER_CREDENTIALS,
  email,
  password,
});