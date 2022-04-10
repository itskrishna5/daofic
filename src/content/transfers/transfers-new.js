// formats
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import WebbDividerSmall from "../webb/webb-divider-sm";
import WebbModuleInfo from "../webb/webb-module-info";
import WebbLoader from "../webb/webb-loader";

import { UserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

const list = (require("../../data/data-transfers-formats.json")).data.filter(item=>item.actv);

export default function TransfersNewModule() {

  const asset = UserForm() === "in" ? GetLocalUser() : GetLocalBusiness();
  
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState()
  const sort = [""] // [...new Set(data.map(item=>item.sort))];

  useEffect( () => {
    if (asset){
      const fetchData = async() => {
        
        setData(list)
        setLoading(false)
      }
      fetchData()
    } else {}
  },[]);

  if (loading){ return ( <> <WebbLoader /> </> ) }

  return (
  <>
    {/* info */}
    <WebbModuleInfo data={{text: `Please Select Transfer Type`}}/>
    <WebbDividerSmall />

    {/* options */}
    <div className="">
    {sort && sort.map((srtx, x) => (
      <div className="row" key={x}>
        <p className="fw-bold text-color-main m-0 mb-3">{srtx}</p>
        
        <div className="">
          {data && data.map((item, i) => (

              <Link to={`/${UserForm()}/${item.link}`} key={i}>
                
                <div className="d-flex p-2 bg-wite text-dark rounded-wd mb-3 hilite" >
                {/* options */}
                <div className='p-3'>
                  <i className={`${item.icon} text-color-next`} style={{fontSize:'2rem'}}></i>  
                </div>

                <div className='p-1'>
                  <p className='fw-bold m-0'>{item.name}</p>
                  <p className='small m-0'>{item.text}</p>
                </div>

                <div className='ms-auto text-end py-3 px-2'>
                  <div className="mb-1"></div>
                  <i className="bx bx-chevron-right text-color-tone" 
                    style={{fontSize:'1.5rem'}}> 
                  </i>
                </div>

                </div>
              </Link>
       
          ))}
        </div>
      </div>
    ))}
    </div>
    
  </>
  )
}