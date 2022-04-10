// main
import { useState } from "react";
import { useHistory } from "react-router-dom";

import ContentFormatXZ from "../content/webc/content-format-xz";

import WebbDividerMedium from "../content/webb/webb-divider-md";
import WebbDividerSmall from "../content/webb/webb-divider-sm";

import icon from "../media/icon.png";
import wise from "../media/wise.png";


const data = [
  {name: 'Email', icon:'bi-envelope', link: 'account/mail', actv: true},
  {name: 'Mobile', icon:'bi-phone', link: 'account/mobile', actv: true},
  {name: 'Web3', icon:'bi-globe2', link: 'account/web3', actv: false}
]

export default function Main () {
  
  const history = useHistory();

  const [meta, setMetamask] = useState(window.ethereum)

  return(
    <>
      <ContentFormatXZ 
        head='Main'
        link={``}
        form= 'mini'
        data= {
          <>
            <WebbDividerMedium />
            <div className="bg-white rounded-wd text-center">
              <WebbDividerSmall />
              <WebbDividerMedium />
              <i className='bx bx-globe text-color-main' style={{fontSize:'3.3rem'}}></i>
              <WebbDividerMedium />

              <h1 className="fw-bold text-color-main" style={{fontSize:'1.9rem'}}>
                {process.env.REACT_APP_WEBB_SITE_NAME}
              </h1>
              <p className="lead text-muted">
                {process.env.REACT_APP_WEBB_SITE_LINE}
              </p>
              <div className="" style={{height:'15vh'}}></div>
              <img src={wise} className="img-fluid rounded-wd"></img>
              
            </div>

            <WebbDividerMedium />
            <p className="text-color-tone text-center">Connect Your Account</p>

            <div className={`d-flex p-3 py-0 bg-wite rounded-wd hilite`}
              style={{cursor:'pointer'}}
              onClick={() => history.push('/account/mail')}
            >
              <div className="py-2 mt-1">
                <i className="lead bx bx-envelope text-color-main m-0"  style={{fontSize:"1.25rem"}}></i>
              </div>
              <div className="ps-2 py-2">
                <p className="m-0 mt-1">Login with Email</p>
              </div>
              <div className="ms-auto text-end py-2 mt-1">
                <i className="bx bx-chevron-right lead text-color-tone m-0" ></i>
              </div>
            </div>

            <WebbDividerSmall />
            <div className={`d-flex p-3 py-0 bg-wite rounded-wd hilite ${meta?'':'d-none'}`}
              style={{cursor:'pointer'}}
              onClick={() => alert('metamask wins')}
            >
              <div className="py-2 mt-1">
                <i className="lead bx bx-globe text-color-main m-0"  style={{fontSize:"1.25rem"}}></i>
              </div>
              <div className="ps-2 py-2">
                <p className="m-0 mt-1">Connect via Metamask</p>
              </div>
              <div className="ms-auto text-end py-2 mt-1">
                <i className="bx bx-chevron-right lead text-color-tone m-0" ></i>
              </div>
            </div>

          </>
        } 
      />
    </>
  )
}