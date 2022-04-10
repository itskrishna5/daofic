// onboard
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import WebbDividerSmall from "../webb/webb-divider-sm";
import WebbDividerMedium from "../webb/webb-divider-md";
import WebbModuleInfo from "../webb/webb-module-info";
import WebbLoader from "../webb/webb-loader";
import FormNeeded from "../webb/form-needed";

import { GetLocalUser } from "../../services/srvc-auth-user";
import { GetNewBusiness, SetNewBusiness } from "../../services/srvc-auth-user";
import { NewBusinessAccount, SetBusinessInfo } from "../../services/srvc-user-realm";

const businessFormList = (require("../../data/data-business-form.json")).data;
const businessDomainList = (require("../../data/data-business-domain.json")).data;

export default function OnboardBusinessNameModule() {

  const asset = GetLocalUser();
  const bznx = GetNewBusiness();
  
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(false);
  const [text, setText] = useState('');

  const [data, setData] = useState({
    name: '',
    bios: '',
    domn: '',
    sort: 'daos',
    form: 'bznx'
  });

  // form validation
  useEffect( () => {
    setForm(false)
    if (data.name !=='' && data.bios !=='' && data.sort !=='' && data.domn !=='') 
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
      const result = await NewBusinessAccount({
        data: {...data, self: true, user: asset.usid},
        user: asset.usid
      })
      console.log(result)
      SetNewBusiness({usid:result.data})

      setLoading(false);
      if (result.data) history.push('/account/next')
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
    <WebbModuleInfo data={{ text: 'Please Enter DAO/Business Details' }} />
  

    {/* form */}
    <form onSubmit={handleSubmit}>
      <div className="">
        
        <div className="form-group mb-3">
          <label className="form-label small">DAO/Business Name  <FormNeeded /></label>
          <input type="text" 
            className="form-control height-md" 
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.name}
            onChange={({ target }) => {handleChange("name", target.value); setText('');}}
            placeholder="">
          </input>
        </div>

        <div className="form-group mb-3">
          <label className="form-label small">DAO/Business Description (Short Bio) <FormNeeded /></label>
          <textarea type="text" 
            className="form-control"
            style={{fontSize:'0.9rem'}}
            rows='3'
            value={data.bios}
            onChange={({ target }) => {handleChange("bios", target.value); setText('');}}
            placeholder="">
          </textarea>
        </div>

        <div className="form-group mb-3">
          <label className="form-label small">Business Domain  <FormNeeded /></label>
          <select 
            className="form-select height-md "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.domn}
            onChange={({ target }) => handleChange("domn", target.value)}
            >
              <option value =''>Select Business Domain</option>
              {businessDomainList.map((item,i) => (
              <option key={i} value={item.name}>{item.name}</option>
            ))}
          </select>
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