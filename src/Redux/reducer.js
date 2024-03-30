import { ADD_USER, UPDATE_USER, DELETE_USER } from "./actionTypes"

const initialState = {
    userData: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                userData: [...state.userData, action.payload],
            };
        case UPDATE_USER:
            const updatedUserData = [...state.userData];
            updatedUserData[action.payload.index] = action.payload.user;
            return {
                ...state,
                userData: updatedUserData,
            };
        case DELETE_USER:
            const filteredUserData = state.userData.filter((el, i) => i !== action.payload);
            return {
                ...state,
                userData: filteredUserData,
            };
        default:
            return state;
    }
};

export default reducer