import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import stockReducer from "./stocks_reducer"
import newsReducer from "./news_reducer"

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: stockReducer,
    news: newsReducer
});

export default entitiesReducer;