import React from "react";
import SplashContainer from "./splash/splash_container";
import HomeContainer from "./home/home_container";
import SignupFormContainer from "./forms/SignupFormContainer"
import LoginFormContainer from "./forms/LoginFormContainer"
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route,Switch} from 'react-router-dom';
const App = () => (
    <div>
        <Switch>
            <AuthRoute exact path="/" component={SplashContainer} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
        </Switch>
        <ProtectedRoute exact path="/" component={HomeContainer} />
        
    </div>
);
export default App;

{/* <Switch>
    <AuthRoute exact path="/login" component={LogInFormContainer} />
    <AuthRoute exact path="/signup" component={SignUpFormContainer} />
    <ProtectedRoute exact path="/benches/new" component={BenchFormContainer} />
    <Route path="/benches/:benchId" component={BenchShowContainer} />
    <Route exact path="/" component={SearchContainer} />
</Switch> */}