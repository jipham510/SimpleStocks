import React from "react";
import ReactDOM from "react-dom";
// import { postUser, postSession, deleteSession} from "./util/session_api_util";
import configureStore from "./store/store";
import Root from "./components/root";
// import {fetchStock} from "./util/stock_api_util";
// import { fetchStock} from "./actions/stock_actions";
// import { fetchNews } from "./actions/news_actions";
// import { fetchCompanyInfo, fetchStockStats, fetchStockChart} from "./util/stock_api_util"; 
document.addEventListener("DOMContentLoaded", () => {
    let store;

    //TESTING START
    // window.fetchNews = fetchNews;
    //TESTING END
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    // TESTING STORE
    window.dispatch = store.dispatch;
    window.getState = store.getState;
    // END
    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store} />, root);
});
