// site logo
import {Link} from 'react-router-dom';

import { UserForm } from "../../services/srvc-utilities";

export default function WebbIconLite() {

  return (
  <>
    <div className="">
      <Link to={`/${UserForm()}/home`}> 
        <i className='bx bx-globe' style={{fontSize:'2rem'}}></i>    
      </Link>
    </div>

  </>
  )
}