// onboard
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import WebbDividerSmall from "../webb/webb-divider-sm";
import WebbDividerMedium from "../webb/webb-divider-md";
import WebbModuleInfo from "../webb/webb-module-info";
import WebbLoader from "../webb/webb-loader";
import FormNeeded from "../webb/form-needed";

import { GetAuthUser, GetNewUser } from "../../services/srvc-auth-user";
import { CreateUserAccount } from "../../services/srvc-accounts-realm";

export default function OnboardUserAccountModule() {

  const asset = GetAuthUser();
  const usrx = GetNewUser();
  console.log(usrx)
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(false);
  const [text, setText] = useState('');

  const [data, setData] = useState({
    acnt: '',
    ntwk: 'devnet-nft'
  });

  // form validation
  useEffect( () => {
    setForm(false)
    if (data.acnt !=='') 
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

      const result = await CreateUserAccount({
        data: {acnt: data.acnt, ntwk: data.ntwk, user: usrx.usid},
        user: usrx.usid
      })
      console.log (result)
      history.push('/account/next')
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
    <WebbModuleInfo data={{ text: 'Please Link Your Web3 Account' }} />
    <WebbDividerSmall />

    {/* form */}
    <form onSubmit={handleSubmit}>
      <div className="">

        <div className="form-group mb-3">
          <label className="form-label small">Web3 Account <FormNeeded /></label>
          <input type="text" 
            className="form-control height-md" 
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.acnt}
            onChange={({ target }) => {handleChange("acnt", target.value); setText('');}}
            placeholder="">
          </input>
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
    {/* text */}
    <div className="mb-3">

    </div>

    <WebbDividerMedium />
    <WebbDividerMedium />

  </>
  )
}