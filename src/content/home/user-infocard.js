// user info

import { UserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

export default function UserInfoModule() {

  const asset = UserForm() === "in" ? GetLocalUser() : GetLocalBusiness();

  return (
  <>
    <div className="p-3 bg-white rounded-wd text-center">
      <p className="lead fw-bold text-color-next m-0 p-0">{asset.name}</p>
      <p className="m-0 text-color-tone">{asset.form === 'indx' ? 'Personal' : 'Business'} Account</p>
    </div>

  </>
  )
}