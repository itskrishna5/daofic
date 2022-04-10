import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { auth } from '../../services/firebase'
import { signInWithEmailLink } from "firebase/auth";

import WebbDividerSmall from "../webb/webb-divider-sm";
import WebbLoader from "../webb/webb-loader";
import WebbSpinner from "../webb/webb-spinner-sm";
import FormNeeded from "../webb/form-needed";

import { SetAuthUser } from "../../services/srvc-auth-user";


export default function AuthMailCheckFirebaseModule () {

  const [username, setUsername] = useState(window.localStorage.getItem('authmail'));
  
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [text, setText] = useState("");

  const history = useHistory();

  useEffect(() => { 

    if (username) {
      signInWithEmailLink(auth, username, window.location.href)
      .then((result) => {
        window.localStorage.removeItem('authmail');
        console.log(result.user);
        
        SetAuthUser({user: result.user.email})
        
        setDone(true)
        history.push('/account/next')
      })
      .catch((error) => {
        console.log(error);
        setText('Invalid Login / Link Expired. Please request new link')
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
      
      setLoading(false)

    }
    else {
      // alert('X')
      setLoading(false)
    }

  },[])


  const handlePasscode = async () => {
    
  }

  const handleSubmit = async e => {
    e.preventDefault();    

    setLoading(true)
    if (username) {
      signInWithEmailLink(auth, username, window.location.href)
      .then((result) => {
        window.localStorage.removeItem('authmail');
        console.log(result.user);
        
        SetAuthUser({user: result.user.email})
        
        setDone(true)
        history.push('/account/next')
      })
      .catch((error) => {
          console.log(error);
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
      
      setLoading(false)
    }

  };

  if (loading && username) 
  return (<> <WebbLoader /> </>)


  return (
  <>
    {/* info */}  
    <WebbDividerSmall />
      
    {/* main */}    
    <form onSubmit={handleSubmit}>
      <div className={loading || done || username ? 'd-none' : ''}>
        
        <div className="mb-3">
          <label className="form-label small">Please re-enter Email Address <FormNeeded/></label>
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
            disabled={!username}
            className="btn btn-primary back-color-main height-md"
            ><small>Submit</small>
          </button>
        </div>
  
        <small className="text-danger">{text}</small>
        
      </div>
  
    </form>  
  
    <div className={done ? '' : 'd-none'}>
      <div className="bg-white p-3 rounded-wd text-center mb-3">
      
        <i className="bi-shield-check lead text-success"
          style={{fontSize:"2.4rem", lineHeight:"0"}}
        ></i>
        <WebbDividerSmall />
        <WebbSpinner />
        <WebbDividerSmall />
        <p className="m-0">
          Please Wait...
        </p>

      </div>

    </div>

    </>
    )
  }