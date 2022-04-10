// header
import IconCancel from './icon-cancel';
import WebbIcon from './webb-icon';

export default function WebbHeaderWide(props) {

  return (
  <>
  <div className="border-bottom bg-white">
    <div className="container-fluid d-flex justify-content-between py-2" style={{height:'3.3em'}}>
      
      <div className="d-none d-sm-block">
        <WebbIcon />
      </div>
      
      <div className="text-center py-2">
        <h2 className="text-color-main m-0 p-0">{props.name} </h2>
        <p className="small m-0 p-0 d-none"><small>{props.desc}</small></p>
      </div>
      
      <div className="text-end">
        <div className="py-1">
          <IconCancel link={props.link} />
        </div>
      </div>

    </div>
  </div>
  </>
  )
}