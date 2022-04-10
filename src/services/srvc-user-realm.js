//init
import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REACT_APP_MNDB_RELM_USER});


export const AuthCodeUser = async () => {
  const cred = Realm.Credentials.apiKey(process.env.REACT_APP_MNDB_AUTH_USER);
  const user = await app.logIn(cred);
  return user
}


// onboard new user - step 1 (name)
export const NewUserAccount = async (item) => {
  const authuser = await AuthCodeUser()
  const result = await authuser.functions.userCreateAccount(JSON.stringify({
    ...item, 
    webb: process.env.REACT_APP_WEBB_SITE_NMBR
  }));
  // console.log(result)
  return JSON.parse(result);
}

// update user profile  during onboarding
export const SetUserName = async (item) => {
  const result = await app.currentUser.functions.userSetAccountName(item)
  return (result);
}


// onboard new business - step 1 (name)
export const NewBusinessAccount = async (item) => {
  const authuser = await AuthCodeUser()
  const result = await authuser.functions.userCreateBusiness(JSON.stringify({
    ...item, 
    webb: process.env.REACT_APP_WEBB_SITE_NMBR
  }));
  // console.log(result)
  return JSON.parse(result);
}

export const GetUserBaseNetwork = async (item) => {
  const authuser = await AuthCodeUser()
  const result = await authuser.functions.userGetBaseNetwork(JSON.stringify({
    ...item, 
    webb: process.env.REACT_APP_WEBB_SITE_NMBR
  }));
  // console.log(result)
  return JSON.parse(result);
}

export const SetUserBaseNetwork = async (item) => {
  const authuser = await AuthCodeUser()
  const result = await authuser.functions.userSetBaseNetwork(JSON.stringify({
    ...item, 
    webb: process.env.REACT_APP_WEBB_SITE_NMBR
  }));
  // console.log(result)
  return JSON.parse(result);
}


export const GetUserAccountCredits = async (item) => {
  const authuser = await AuthCodeUser()
  const result = await authuser.functions.userGetAccountCredits(JSON.stringify({
    ...item, 
    webb: process.env.REACT_APP_WEBB_SITE_NMBR
  }));
  // console.log(result)
  return JSON.parse(result);
}

// update user profile  during onboarding
export const SetBusinessInfo = async (item) => {
  const result = await app.currentUser.functions.userSetBusinessInfo(item)
  return (result);
}

