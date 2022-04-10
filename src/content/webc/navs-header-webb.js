// webb header links
import { Link } from "react-router-dom";

import { UserForm } from "../../services/srvc-utilities";
// import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import { ActiveSiteLink } from '../../services/srvc-utilities';

const list = (require("../../data/navs-header-webb.json")).data;

export default function NavsHeaderWebb() {

  // const asset = UserForm() === "in" ? GetLocalUser() : GetLocalBusiness();
  const data = list.filter(item => item.user.includes('ww') );
  
  return (
  <>
    <nav className="nav justify-content-start">
      {data && data.map((item, i) => ( item.actv ?
      
        <Link to={`/${item.link}`} key={i}
          className={`nav-link m-0 py-1 px-1 mx-2 rounded hilite
            ${item.link === ActiveSiteLink() 
            ? 'text-primary' 
            : 'text-tone'}`}>
          {item.name}
        </Link>
        
      
      :''))}
    </nav>

  </>
  )
}