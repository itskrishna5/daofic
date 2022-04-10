// logout
import WebbSpinner from "../webb/webb-spinner-sm"

import firebase from "../../services/firebase";
import { getAuth, signOut } from "@firebase/auth";

import { AuthUserSessionX } from "../../services/srvc-auth-realm";
import { AuthClearStore } from "../../services/srvc-auth-user";

const auth = getAuth();

export default function AuthSessionXModule() {
  
  AuthUserSessionX();
  AuthClearStore();
  setTimeout(() => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log ('signout: ', 'success')
      //window.location.href='/';
    }).catch((error) => {
      // An error happened.
      console.log ('signout: ', error.code)
    });
  }, 2000);

  return (
    <div className="container-fluid">
      <div className="text-center">
        <div style={{height:"24vh"}}></div>
        <WebbSpinner />
        <div className="py-3"></div>
        <p className="small text-muted">Logout User</p> 
      </div>
    </div>

  )
}