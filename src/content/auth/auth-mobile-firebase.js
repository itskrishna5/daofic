import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import WebbLoader from "../webb/webb-loader";
import firebase from "../../services/firebase";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { AuthMobileUser } from "../../services/srvc-auth-realm"; 
import { SetAuthUser } from "../../services/srvc-auth-user";

const auth = getAuth();

export default function AuthMobileFirebaseModule () {

  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [btnPasscode, setButtonPasscode] = useState(true);
  const [btnLogin, setButtonLogin] = useState(false);
  const [text, setText] = useState("");
  const [code, setCode] = useState(false);
  const [verf, setVerif] = useState(false);

  const [loading,setLoading]=useState(false);
  const history = useHistory();

  const refreshPage = ()=> {
    window.location.reload(false);
  }

  const handleSetup = async() => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // console.log(response)
        setVerif(true);
        handlePasscode();
      }
    }, auth);
  }

  const handlePasscode = async () => {
    
    if (!verf) handleSetup();

    const phoneNumber = '+91'+username;
    const appVerifier = window.recaptchaVerifier;

    await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      console.log('code: sent');
      setText('Passcode (OTP) sent');
      setCode(true);
      setButtonPasscode(false);
      setButtonLogin(true);
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      console.log('code: ', error);
      setText('error: '+error);
    });    
  }

  const resendPasscode = async() => {

  }

  const handleSubmit = async e => {
    e.preventDefault();    
    localStorage.clear();
    
    if (username==="" || passcode==="" ) {
      setText('Mobile Number and OTP should not be empty');
    } else {
      
        setLoading(true);
        var user = null, errr = '';
        await window.confirmationResult.confirm(passcode)
        .then((result) => { user=result })
        .catch((error) => { errr=error })

        if (user) {
          setText('Passcode Verified');
          const res = await AuthMobileUser(user.user.phoneNumber.substr(1,user.user.phoneNumber-1))
          console.log(res);
          SetAuthUser(res);
          

          history.push('/account/next');
          // history.push('/us/home');
        }
        else {
          setText('Error: '+ errr.code);
        }
        setLoading(false);
    }
  };

  if (loading) 
  return (<> <WebbLoader /> </>)

  return (
  <>

    {/* main */}    
    <form onSubmit={handleSubmit}>
      <div className="mb-3"></div>
      <div className="">
      
        <div className="mb-3">
          <label className="form-label small">Mobile Number <span className="text-danger">*</span></label>
          <input type="text" 
            
            className="form-control height-md" 
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            disabled={btnLogin}
            value={username}
            onChange={({ target }) => {setUsername(target.value); setText('');}}
            placeholder="9876540123">
          </input>
        </div>

        <div className="mb-3">
          <label className="form-label small">Passcode (OTP) <span className="text-danger">*</span></label>
          <input type="password" 
            className="form-control height-md" 
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            disabled={btnPasscode}
            value={passcode}
            onChange={({ target }) => {setPasscode(target.value); setText('');}}
            placeholder="Enter Passcode">
          </input>
        </div>
        
        {/* action */}
        <div className={`mb-3 d-grid ${btnPasscode? '' : 'd-none'}`}>
          <button type="button"
            disabled={username===''|| username.length!==10}
            className="btn btn-primary back-color-main height-md"
            onClick={()=>handlePasscode()}
            ><small>Get Passcode</small>
          </button>
        </div>

        <div className={`mb-3 d-grid ${btnLogin? '' : 'd-none'}`}>
          <button type="submit" 
            disabled={passcode==='' || passcode.length!==6}
            className="btn btn-primary back-color-main height-md">
            <small>Login</small>
          </button>
        </div>

        <div className=""></div>
        <small className="text-danger">{text}</small>
      
      </div>

    </form>  

    <div className="pt-3"></div>
    <div className="d-flex">
      <div className="me-auto">
        <button 
          className="btn btn-link text-decoration-none p-0 text-muted"
          onClick={()=>resendPasscode()}
        ><small>Resend OTP</small></button>
        <div className="pb-3"></div>
      </div>
      
      <div className="">
        <button 
          className="btn btn-link text-decoration-none p-0 text-muted"
          onClick={()=>refreshPage()}
        ><small>Change Mobile Number</small></button>

      </div>

    </div>

    <div className="mb-3"></div>
    <div className="mb-3 border-top"></div>
    <p className="d-none">
      <span>Need Account:  </span>
      <Link to='/account/create' className="link-primary">Create Here</Link>
    </p>

    <p className="d-none">
      <span>Partner Services:  </span>
      <Link to='/account/create' className="link-primary">Login Here</Link>
    </p>

    <div id="recaptcha-container"></div>
  </>
  )
}