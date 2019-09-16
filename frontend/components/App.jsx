import React from "react";
import SignUpFormContainer from "./forms/sign_up_form_container";
import LoginFormContainer from "./forms/login_form_container";
import HomeContainer from "./home/home_container"
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route,Switch, Redirect} from 'react-router-dom';
import StockShowContainer from "./stock/stock_show_container"
const App = () => (
    <div>
        <Switch>
            <AuthRoute exact path="/signup" component={SignUpFormContainer} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <ProtectedRoute exact path="/stocks/:ticker" component={StockShowContainer} />
            <Route exact path="/" component={HomeContainer} />
            <Redirect to="/" />
        </Switch>
    </div>
);
export default App;

