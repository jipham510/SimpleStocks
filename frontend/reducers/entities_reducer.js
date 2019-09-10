import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import stockReducer from "./stocks_reducer"

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: stockReducer
});

export default entitiesReducer;