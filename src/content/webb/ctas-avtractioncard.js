// cancel button
import { Link } from 'react-router-dom';

import { UserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

export default function AvatarActionCard(props) {

  // const asset = GetAuthUser();
  const asset = UserForm() === "in" ? GetLocalUser() : GetLocalBusiness();
  const data = props.data;
  
  return (
  <>
    <Link 
      disabled={data.actv}
      style={{pointerEvents: data.actv?'' : 'none' }}
      to={`/${UserForm()}/${data.link}`}>
      
      <div className="rounded-wd mb-3 bg-wite hilite">
        <div className="media-square">
          <img src={data.avtr} className="img-fluid rounded-wd" alt="..." ></img>
        </div>

        <div className="p-3  text-center">
          <p className="fw-bold text-color-main m-0" style={{fontSize:'1rem'}}>{data.name}</p>
          <p className="small text-dark m-0 p-0">{data.text}</p>
        </div>

      </div>
    </Link>

  </>
  )
}