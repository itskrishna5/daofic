// dashboard shortcuts
import { Link } from "react-router-dom";
import IconLabel from "../webb/icon-label";

import WebbDividerSmall from "../webb/webb-divider-sm";

import { UserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

const list = require("../../data/data-user-tasks.json").data;

export default function UserTasksModule() {

  const asset = UserForm() === "in" ? GetLocalUser() : GetLocalBusiness();
  const data = (list.filter(item => item.user.includes(asset.form)));

  return (
  <>
    <WebbDividerSmall />
    <div className="row row-cols-3 row-cols-md-3 g-1">

      {data && data.map((item, i) => ( item.actv ?
        <div className="col text-center" key={i}>
          <Link to={`/${UserForm()}/${item.link}`}>
            <div className="rounded-wd py-3 bg-wite hilite">
        
              <i className={`m-0 text-color-${item.actv ? 'next' : 'lite'} ${item.icon}`}  
                style={{fontSize:"2.4em"}}>
              </i>
              
              <div className="d-none d-md-block">
                <p className={`m-0 pt-2 text-color-tone text-nowrap small`}>
                {item.name}
                </p>
              </div>

              <div className="d-md-none">
                <p className={`m-0 pt-2 text-color-tone text-nowrap small`}>
                <small>{item.name}</small>
                </p>
              </div>

            </div>     
            
          </Link>
        </div>
      :''))}

    </div>
    <WebbDividerSmall />
  </>
  )
}