import React, { useState } from "react";

import { auth } from '../../services/firebase'
import { sendSignInLinkToEmail } from "firebase/auth";

import WebbDividerSmall from "../webb/webb-divider-sm";
import WebbModuleInfo from "../webb/webb-module-info";
import WebbLoader from "../webb/webb-loader";
import FormNeeded from "../webb/form-needed";



export default function AuthMailFirebaseModule () {

  const [username, setUsername] = useState("");
  const [done, setDone] = useState(false);
  const [text, setText] = useState("");

  const [loading, setLoading]=useState(false);

  const handlePasscode = async () => {
    
    setLoading(true)
    localStorage.clear();

    const base = window.location.hostname === 'localhost' 
      ? 'http://localhost:3000'
      : process.env.REACT_APP_WEBB_SITE_SITE

    const actionCodeSettings = {
      
      url:  base + '/account/mail/auth',
      // This must be true.
      handleCodeInApp: true

    };

    await sendSignInLinkToEmail(auth, username, actionCodeSettings)
    .then(() => {
      
      window.localStorage.setItem('authmail', username  );
      // alert(`please check your mail at ${username}`);
      setText ('Link has been sent to your email')
      setDone(true)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage);
    });
    
    setLoading(false)
  
  }

  const resendPasscode = async() => {

  }

  const handleSubmit = async e => {
    e.preventDefault();    

  };

  if (loading) 
  return (<> <WebbLoader /> </>)

  return (
  <>
    {/* info */}  
    <WebbDividerSmall />
    <WebbModuleInfo data={{text: 'Get Authentication Link'}} />

    {/* main */}    
    <form onSubmit={handleSubmit}>
      
      <div className={done ? 'd-none' : ''}>
      
        <div className="mb-3">
          <label className="form-label small">Email Address <FormNeeded/></label>
          <input type="text" 
            
            className="form-control height-md" 
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={username}
            onChange={({ target }) => {setUsername(target.value); setText('');}}
            placeholder="user@mail.com">
          </input>
        </div>
        
        {/* action */}
        <div className={`mb-3 d-grid`}>
          <button
            disabled={username===''}
            className="btn btn-primary back-color-main height-md rounded-pill"
            onClick={()=>handlePasscode()}
            ><small>Get Link</small>
          </button>
        </div>
      
      </div>

    </form>  


    <div className={done ? '' : 'd-none'}>
      <div className="bg-white p-3 rounded-wd text-center mb-3">
      
        <i className="bi-check-circle lead text-success"
          style={{fontSize:"2.4rem", lineHeight:"0"}}
        ></i>
        <WebbDividerSmall />
        <p className="m-0">{text}</p>

      </div>

      <div className="text-center p-1" 
        onClick={() => {setDone(false); setUsername('')}}
        style={{cursor:'pointer'}}
        >
        <small className="text-color-tone">Try Again / Use Different Email</small>
      </div>

    </div>

  </>
  )
}