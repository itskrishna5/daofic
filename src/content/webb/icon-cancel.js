// cancel button
import { Link } from 'react-router-dom';

export default function IconCancel(props) {

  return (
  <>
    <Link
      className="text-secondary"
      to={props.link}
      >
      <i className='bi-x' 
      style={{fontSize:"1.9rem", lineHeight:'0rem'}}></i>
    </Link>

  </>
  )
}