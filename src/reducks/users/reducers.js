import * as Action from "./actions";
import initialState from "../store/initialState";

export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Action.SIGN_IN:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

