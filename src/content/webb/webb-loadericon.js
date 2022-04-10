//loader
import icon from '../../media/iconlite.png';

export default function WebbLoader(props) {
 
  return (
  <>
      {/* web */}
      <div className="container-fluid py-3" style={{minHeight:"96vh"}}>
        <div className="row">
          <div className="col text-center">
            
            <div className="" style={{height:"24vh"}} ></div>
            <img src={icon} className="" width="42" height="42" alt="..." ></img> 
            <div className='mb-3'></div>
            <p className="small text-muted m-0 pt-3 pb-0"
            >{props.text ? props.text : 'Please wait...'}</p>

          </div>
        </div>
      </div>
  </>
  )
}