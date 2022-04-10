// site logo
import {Link} from 'react-router-dom';
import icon from '../../media/iconwite.png';

import { UserForm } from "../../services/srvc-utilities";

export default function WebbIconLite() {

  return (
  <>
    <div className="py-1">
      <Link to={`/${UserForm()}/home`}>
        <img src={icon}
          className=""
          style={{width:"1.9em", height:"1.9em"}} alt="..."
        ></img>      
      </Link>
    </div>

  </>
  )
}