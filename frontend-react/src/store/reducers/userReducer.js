import initialState from '../initialState';

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_TOKEN":
            return { ...state, userToken: action.payload };
        case "REMOVE_USER_TOKEN":
            return { ...state, userToken: null };

        case "SET_USER_DATA":
            return { ...state, userData: action.payload };
        default:
            return state;
    }
};