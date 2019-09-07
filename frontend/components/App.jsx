import React from "react";
import GreetingContainer from "./home/home_container";
import SignupFormContainer from "./forms/SignupFormContainer"
import LoginFormContainer from "./forms/LoginFormContainer"
import { AuthRoute } from '../util/route_util';
import { Route,Redirect,Switch,Link} from 'react-router-dom';
const App = () => (
    <div>
        {/* <p>app</p> */}
        <Switch>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <Route exact path="/" component={GreetingContainer} />
        </Switch>
        
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