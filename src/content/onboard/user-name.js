// onboard
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import WebbDividerSmall from "../webb/webb-divider-sm";
import WebbDividerMedium from "../webb/webb-divider-md";
import WebbModuleInfo from "../webb/webb-module-info";
import WebbLoader from "../webb/webb-loader";
import FormNeeded from "../webb/form-needed";

import { GetAuthUser, SetNewUser, GetNewUser } from "../../services/srvc-auth-user";
import { NewUserAccount, SetUserName } from "../../services/srvc-user-realm";

export default function OnboardUserNameModule() {

  const asset = GetAuthUser();
  const usrx = GetNewUser();
  
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(false);
  const [text, setText] = useState('');

  const [data, setData] = useState({
    name: '',
    bios: '',
    mmid: isNaN(asset.user) ? '' : asset.user,
    mmvr: isNaN(asset.user) ? false : true,
    emid: isNaN(asset.user) ? asset.user : '',
    emvr: isNaN(asset.user) ? true : false,
    form: 'indx'
  });

  // if usrx exist + self, then redirect to next
  
  // form validation
  useEffect( () => {
    setForm(false)
    if (data.name !=='' && data.bios !=='') 
      setForm(true);
  },[data]);

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form) 
    {
      setLoading(true);

      const datx = {
        data: {...data, actv: true, self: true},
        user: (usrx.usid!=='') ? usrx.usid : asset.user
      }
      // console.log( JSON.stringify(datx) );
      
      var res = {} 
      if (usrx.usid==='') res = await NewUserAccount(datx)
      else res = await SetUserName(datx)
      // console.log(res)
      
      if (res.data) {
        SetNewUser({usid:res.data})
        setLoading(false);
        history.push(`/account/next`);
      }
      
      setLoading(false);
      //resetForm();
    }
    else {
      setText('Please enter details')
    }
  }

  if (loading){ return ( <> <WebbLoader /> </> ) }
  
  return (
  <>
    {/* info */}
    <WebbModuleInfo data={{ text: 'Please provide following details' }} />

    {/* form */}
    <form onSubmit={handleSubmit}>
      <div className="">
        
        <div className="form-group mb-3">
          <label className="form-label small">Name / Alias <FormNeeded /></label>
          <input type="text" 
            className="form-control height-md" 
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.name}
            onChange={({ target }) => {handleChange("name", target.value); setText('');}}
            placeholder="">
          </input>
        </div>

        <div className="form-group mb-3">
          <label className="form-label small">Short Bio <FormNeeded /></label>
          <textarea type="text" 
            className="form-control" 
            style={{fontSize:'0.9rem'}}
            rows='3'
            value={data.bios}
            onChange={({ target }) => {handleChange("bios", target.value); setText('');}}
            placeholder="">
          </textarea>
        </div>

      </div>

      
      {/* actn */}
      <WebbDividerMedium />
      <div className="">
        <div className="d-grid">
          <button className={`btn height-md btn-primary back-color-main border-none rounded-pill`}
            disabled={!form}
          ><small>Save & Continue</small>
          </button>
        </div>
      </div>

    </form>
    
    <WebbDividerMedium />
    <WebbDividerMedium />

  </>
  )
}