import React from "react";
import Splash from "./home/Splash";
import HomeContainer from "./home/UserPage/UserPageContainer";
import SignupFormContainer from "./forms/SignupFormContainer"
import LoginFormContainer from "./forms/LoginFormContainer"
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route,Switch} from 'react-router-dom';
const App = () => (
    <div>
        <Switch>
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/" component={Splash} />
        </Switch>
        <ProtectedRoute exact path="/" component={HomeContainer} />
        {/* <Switch>
            <AuthRoute exact path='/signup' component={SignupFormContainer} />
            <AuthRoute exact path='/login' component={LoginFormContainer} />
            <ProtectedRoute exact path="/stocks/:ticker" component={StockShowContainer} />
            <ProtectedRoute exact path="/users/:id" component={UserProfileContainer} />
            <Route exact path='/' component={HomeContainer} />
            <Redirect to="/" />
        </Switch> */}
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