import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root";

document.addEventListener("DOMContentLoaded", () => {
    let store;

    //TESTING START
        // insert functions here
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
