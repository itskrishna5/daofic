// webb header links
import { Link } from "react-router-dom";

import { UserForm, ActiveLink } from "../../services/srvc-utilities";
import { GetLocalBusiness, GetLocalUser } from "../../services/srvc-auth-user";

const list = (require("../../data/navs-header-main.json")).data;

export default function WebbHeaderNavsTall() {

  const asset = UserForm() === "us" ? GetLocalUser() : GetLocalBusiness();
  const data = (list.filter(item => item.user.includes(asset.form) ));

  return (
  <>
    <nav className="nav flex-column text-center">
      {data && data.map((item, i) => ( item.actv ?
      <Link to={`/${asset.form}/${item.link}`} key={i}
        className={`nav-link m-0 p-0 mb-1
        ${item.link === ActiveLink() 
          ? 'text-warning' 
          : 'text-lite'}`}
        >
        <div className="p-1 hidark">
          <i className={`${item.icon}${item.link === ActiveLink()?'-fill':''}`}
            style={{fontSize:'1.5rem', lineHeight:'0rem'}}
          ></i>
          <p className="m-0 p-0 small"><small>{item.name}</small></p>

        </div>

      </Link>
      :''))}
    </nav>

  </>
  )
}