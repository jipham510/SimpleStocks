import { combineReducers } from "redux";

import sessionErrorsReducer from "./session_errors_reducer";
import ordersErrorsReducer from "./orders_errors_reducer";

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    orders: ordersErrorsReducer
});

export default errorsReducer;