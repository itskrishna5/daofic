// onboard
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import WebbDividerSmall from "../webb/webb-divider-sm";
import WebbDividerMedium from "../webb/webb-divider-md";
import WebbModuleInfo from "../webb/webb-module-info";
import WebbLoader from "../webb/webb-loader";
import FormNeeded from "../webb/form-needed";

import { UserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { NewContactPerson, NewContactTeam } from "../../services/srvc-contacts-realm";
import { NewContactBusiness } from "../../services/srvc-contacts-realm";

const list = [
  {code: 'indx', name: 'Person', actv: true},
  {code: 'tmbx', name: 'Team', actv: true},
  {code: 'bznx', name: 'Business', actv: true}
]

export default function ContactsAddModule() {

  const asset = UserForm() === "in" ? GetLocalUser() : GetLocalBusiness();
  
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(false);
  const [text, setText] = useState('');

  const [data, setData] = useState({
    name: '',
    emid: '',
    acnt: '',
    form: 'indx'
  });

  // if usrx exist + self, then redirect to next
  
  // form validation
  useEffect( () => {
    setForm(false)
    if (data.name !=='' && data.emid !=='' 
      && data.form !=='' && ['indx', 'tmbx', 'bznx'].includes(data.form)) 
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
        data: data,
        user: asset.usid
      }
      
      var result
      if (data.form === 'indx') {result = await NewContactPerson(datx)}
      if (data.form === 'tmbx') {result = await NewContactTeam(datx)}
      if (data.form === 'bznx') {result = await NewContactBusiness(datx)}
      console.log(result)
      
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

        <div className="mb-3 d-none">
          <label className="form-label small">Contact Type <FormNeeded /></label>
          <div className="row row-cols-3 g-1">
          {list && list.map((item, i) => ( item.actv ?
            <div className="col text-center" key={i}>
              <div className={`p-3 rounded-wd hilite ${data.form===item.code ? 'back-color-next text-white' : 'bg-wite'}`}
                style={{cursor:'pointer'}}
                onClick={()=>handleChange('form', item.code)}
              >
                <p className="m-0">{item.name}</p>
              </div>
            </div>
          :''))}

          </div>
        </div>
        
        <div className="form-group mb-3">
          <label className="form-label small">Name <FormNeeded /></label>
          <input type="text" 
            className="form-control height-md" 
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.name}
            onChange={({ target }) => {handleChange("name", target.value); setText('');}}
            placeholder="">
          </input>
        </div>

        
        <div className="form-group mb-3">
          <label className="form-label small">Email <FormNeeded /></label>
          <input type="text" 
            className="form-control height-md" 
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.emid}
            onChange={({ target }) => {handleChange("emid", target.value); setText('');}}
            placeholder="">
          </input>
        </div>

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
          ><small>Add Contact</small>
          </button>
        </div>
      </div>

    </form>
    
    <WebbDividerMedium />
    <WebbDividerMedium />

  </>
  )
}