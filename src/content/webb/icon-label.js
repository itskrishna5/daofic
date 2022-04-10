// cancel button
import { Link } from 'react-router-dom';

export default function IconLabel(props) {

  return (
  <>
    <div className="rounded-wd py-3 bg-wite hilite">
      
      <i className={`m-0 text-color-next ${props.icon}`}  
        style={{fontSize:"2.4em"}}>
      </i>
      
      <div className="d-none d-md-block">
        <p className={`m-0 pt-2 text-color-tone text-nowrap small`}>
        {props.name}
        </p>
      </div>

      <div className="d-md-none">
        <p className={`m-0 pt-2 text-color-tone text-nowrap small`}>
        <small>{props.name}</small>
        </p>
      </div>

    </div>

  </>
  )
}