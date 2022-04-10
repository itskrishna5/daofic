// onboard
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import WebbDividerSmall from "../webb/webb-divider-sm";
import WebbDividerMedium from "../webb/webb-divider-md";
import WebbModuleInfo from "../webb/webb-module-info";
import WebbLoader from "../webb/webb-loader";
import FormNeeded from "../webb/form-needed";

import { GetAuthUser, GetNewUser } from "../../services/srvc-auth-user";
import { GetUserBaseNetwork, SetUserBaseNetwork } from "../../services/srvc-user-realm";

const list = require('../../data/data-network-list.json').data;

export default function OnboardUserNetworkModule() {

  const asset = GetAuthUser();
  const usrx = GetNewUser();
  console.log(usrx)
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(false);
  const [text, setText] = useState('');

  const [data, setData] = useState({});

  useEffect( () => {
    if (asset){
      const fetchData = async() => {
        
        const res = Array.from(list, item=> {return {
          name: item.name, 
          code: item.code, 
          mode: item.mode,
          stat: false
        }})

        setData(res)

        setLoading(false)
      }
      fetchData()
    } else {}
  },[asset.usid]);

  // form validation
  useEffect( () => {
    setForm(false)
    if (data.acnt !=='') 
      setForm(true);
  },[data]);

  const SetBaseNetwork = async(item) => {
    // alert(item)
    const result = await SetUserBaseNetwork({
      data: {usid: asset.usid, form: asset.form,  code: item },
      user: asset.usid
    })
    
  }

  const handleChange = async(x) => {
    let datx = data.map((item, i) => {
      return (i === x ? {...item, stat: true} : {...item, stat: false})
    });    
    setData(datx)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

  }

  if (loading){ return ( <> <WebbLoader /> </> ) }
  
  return (
  <>
    {/* info */}
    <WebbModuleInfo data={{ text: 'Please Select Default Network' }} />
    <WebbDividerSmall />

    <div className="bg-wite rounded-wd">

    {data && data.map((item, i) => ( 
      <div className="" key={i}>
        <div className="d-flex p-3 pb-2 bg-white rounded-wd">
          <div className="py-1">
            <i className={`bx bx-server ${item.stat ? 'text-color-next' : 'text-color-lite'}`} 
              style={{fontSize:'2rem'}}></i>
          </div>
          <div className="px-2">
            <p className="m-0">
              <span className="pe-2">{item.name}</span>
              <span className="bg-lite rounded px-1 small text-color-tone">
                <small>{item.mode.toUpperCase()}</small>
              </span>
            </p>
            <p className="m-0 small text-color-tone">
              <span>{' '}</span>
              <span>ChainID: {item.code}</span>
            </p>
          </div>
          <div className="ms-auto py-1 text-end">
            <span className={`rounded-pill px-3 py-1 small ${item.stat ? 'back-color-lite' : 'bg-lite'}`} style={{cursor:'pointer '}}
              onClick={()=> {handleChange(i); SetBaseNetwork(item.code)}}
            >
              <small>{item.stat ? 'Default' : 'Set Default'}</small>
            </span>
          </div>
        </div>
        <div className={`border-bottom ${i<data.length-1 ? '' : 'd-none'}`}></div>
      </div>

    ))}
    </div>

    {/* form */}
    <form onSubmit={handleSubmit}>
      
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
      <p className="small text-color-tone">You can change the default network from Settings</p>
    </div>

    <WebbDividerMedium />
    <WebbDividerMedium />

  </>
  )
}