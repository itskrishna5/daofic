import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../context/authcontext";

//views - main
import Main from '../viewsxz/main';


// views - home
import HomeUser from "../viewsxx/home-indx";
import HomeBusiness from "../viewsxx/home-bznx";

// views - transfers

// views - settings



// views - auth - onbd
import AuthMobileFirebase from "../viewsxa/auth-mobile-firebase";
import AuthMailFirebase from "../viewsxa/auth-mail-firebase";
import AuthMailCheckFirebase from "../viewsxa/auth-mail-check";
import AuthNext from "../viewsxa/auth-next";
import AuthSessionX from "../viewsxa/auth-session-x";

import OnboardUser from "../viewsxb/onboard-user";
import OnboardAccount from "../viewsxb/onboard-account";
import OnboardBusiness from "../viewsxb/onboard-business";
import OnboardNetwork from "../viewsxb/onboard-network";

const routes = [

  { path:'/', component: Main, auth:false },

  { path:'/in/home', component: HomeUser, auth:false },
  { path:'/bz/home', component: HomeBusiness, auth:false },

  { path:'/account/mobile', component: AuthMobileFirebase, auth:false },
  { path:'/account/mail', component: AuthMailFirebase, auth:false },
  { path:'/account/mail/auth', component: AuthMailCheckFirebase, auth:false },
  { path:'/account/next', component: AuthNext, auth:true },
  { path:'/account/sessionx', component: AuthSessionX, auth:true },

  { path:'/onboard/user', component: OnboardUser, auth:true },
  { path:'/onboard/daos', component: OnboardBusiness, auth:true },
  { path:'/onboard/account', component: OnboardAccount, auth:true },
  { path:'/onboard/network', component: OnboardNetwork, auth:true }

]

const PrivateRoute = (props) => {
  const location = useLocation();
  
  const { user } = useAuth();
  return user 
  ? ( <Route { ...props } /> ) 
  : ( <Redirect to={{ pathname: "/", state: { from: location } }} /> )
};

export default function Routes() {

  return (
    <Switch>
      {routes.map ((item,i)=>(item.auth
      ? <PrivateRoute
          key={i}
          path={item.path}
          component={item.component}
          exact
        />
      : <Route
          key={i}
          path={item.path}
          component={item.component}
          exact
        />
      ))}
    </Switch>
  );
}