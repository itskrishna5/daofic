import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REACT_APP_MNDB_RELM_USER });

// Function Calls

export const AuthWebbUser = async () => {
  //login with webb
  const credentials = Realm.Credentials.apiKey(process.env.REACT_APP_MNDB_AUTH_USER);
  const user = await app.logIn(credentials);
  return user
}

export const AuthGetUserRoles = async (item) => {
  if (!app.currentUser) await AuthWebbUser()
  else {
    const result = await app.currentUser.functions.authGetUserRoles(JSON.stringify({
      ...item, 
      webb: process.env.REACT_APP_WEBB_SITE_NMBR
    }));
    console.log(result)
    return JSON.parse(result);
  }

}

export const AuthUserSessionX=async()=>{
  // logout current user
  if (!app.currentUser) await AuthWebbUser()
  await app.currentUser.logOut()
}


export const AuthMobileUser = async (id) => {
  //login with mmid
  const credentials = Realm.Credentials.function({mmid:id})
  const user = await app.logIn(credentials);
  console.log('mobile user - ',app.currentUser.id)
  return ({"auth":id, "usrx":user.id});
}


export const AuthMailUser = async (id) => {
  const credentials = Realm.Credentials.function({emid:id})
  const user = await app.logIn(credentials);
  return ({"auth":id, "usrx":user.id});
}
