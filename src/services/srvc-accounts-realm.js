//init
import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REACT_APP_MNDB_RELM_TRXN});


export const AuthCodeAcnt = async () => {
  const cred = Realm.Credentials.apiKey(process.env.REACT_APP_MNDB_AUTH_TRXN);
  const user = await app.logIn(cred);
  return user
}

// ------------------------ //
export const GetUserAccountsList = async (item) => {
  const acntnuser = await AuthCodeAcnt()
  const result = await acntnuser.functions.acntGetUserAccountsList(JSON.stringify({
    ...item, 
    webb: process.env.REACT_APP_WEBB_SITE_NMBR
  }));
  // console.log(result)
  return JSON.parse(result);
}

export const CreateUserAccount = async (item) => {
  const trxnuser = await AuthCodeAcnt()
  const result = await trxnuser.functions.acntCreateAccount(JSON.stringify({
    ...item, 
    webb: process.env.REACT_APP_WEBB_SITE_NMBR
  }));
  // console.log(result)
  return JSON.parse(result);
}

export const SetAccountShow = async (item) => {
  const trxnuser = await AuthCodeAcnt()
  const result = await trxnuser.functions.acntSetAccountShow(JSON.stringify({
    ...item, 
    webb: process.env.REACT_APP_WEBB_SITE_NMBR
  }));
  // console.log(result)
  return JSON.parse(result);
}

