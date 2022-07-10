// Store/Reducers/userTasks

const initialState = { userProfile:[] }

function userTasks(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'UPDATE_USER':
        // Le User est déjà dans la liste, on le supprime de la liste
        nextState = {
          ...state,
          userProfile: [...state.userProfile, action.value]
        }
        return nextState || state
  default:
    return state
  }
}

export default userTasks