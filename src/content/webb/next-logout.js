// next logout
import { Link, useHistory } from "react-router-dom";

export default function NextLogout() {

  const history = useHistory();

  return (
  <>
    <div className="d-flex p-3 py-0 bg-wite rounded-wd hilite"
      style={{cursor:'pointer'}}
      onClick={() => history.push(`/account/sessionx`)}
    >
      <div className="py-1">
        <i className="lead bi-power text-danger m-0 pb-0 mb-0"  style={{fontSize:"1.5rem"}}></i>
      </div>
      <div className="ps-2 py-2">
        <p className="m-0 mt-1">Logout</p>
      </div>
      <div className="ms-auto text-end py-2 mt-1">
        <i className="bi-chevron-right text-color-tone m-0" ></i>
      </div>

    </div>

  </>
  )
}