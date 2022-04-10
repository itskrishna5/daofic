// user
import React from "react";
import { Link } from "react-router-dom";
import Blockies from "react-blockies";

import avtx from '../../media/user.png';

import { UserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

export default function UserAvatar() {

  const asset = UserForm() === "in" ? GetLocalUser() : GetLocalBusiness();
  
  return (
    <>
      <div className="btn-group d-none d-md-block">
        
        {/* change here for switching layouts */}
        <Link className="pb-3" to="#" 
          role="button" id="dropdownMenuLink" 
          data-bs-toggle="dropdown" aria-expanded="false">
          
          <Blockies seed={asset.usid || 'wise'} className="identicon rounded-circle m-0" size={7} />
          <img src={asset.avtr || avtx} 
            className="rounded-circle shadow-sm d-none" 
            width="30" height="30" alt="..." />
        </Link>

        <ul className="dropdown-menu p-0 shadow-lg rounded-wd" aria-labelledby="dropdownMenuLink">
          <div className="back-color-dark p-3 text-white rounded-wd"
            style={{width:'222px', borderBottomLeftRadius:'0', borderBottomRightRadius:'0'}}>
            <p className="fw-bold m-0 p-0 small text-clamp-sm">
              {asset ? asset.name : 'User Name'}
            </p>
            <p className="small m-0 p-0">
              <small>{asset ? `${UserForm() === 'in' ? 'Personal Account' : 'Business Account'}` : 'Account'}</small>
            </p>
          </div>
          <li><Link className="dropdown-item small py-2" to={`/${UserForm()}/settings`}>
            <i className="bi-gear pe-2"></i>Settings</Link>
          </li>
          <li><Link className="dropdown-item small py-2" to={`/account/next`}>
          <i className="bi-emoji-smile pe-2"></i>Switch Accounts</Link>
            </li>
          <li><Link className="dropdown-item small py-2" to={"/account/sessionx"}>
          <i className="bi-power pe-2"></i>Logout</Link>
          </li>
        </ul>
      </div> 


      <div className="d-md-none">
        <Link to={`/${UserForm()}/settings`}>
          <Blockies seed={asset.usid || 'wise'} className="identicon rounded-circle m-0" size={7} />
          <img src={avtx} 
            className="rounded-circle shadow-sm d-none" 
            width="30" height="30" alt="..." />
        </Link>
      </div>

    </>
  )
}