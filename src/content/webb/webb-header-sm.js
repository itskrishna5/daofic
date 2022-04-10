// header
import IconCancel from './icon-cancel';
import WebbIcon from './webb-icon';

export default function WebbHeaderSmall(props) {

  return (
  <>
  <div className="border-bottom bg-white">
    <div className="container-fluid py-2" style={{height:'3.3em'}}>
      <div className="row">
        <div className="col"></div>
        <div className="col-md-6" style={{maxWidth:"420px"}}>

          <div className="d-flex justify-content-between">

            <div className="py-2">
              <WebbIcon />
            </div>

            <div className="py-2">
              <h2 className="text-color-main m-0 p-0">{props.name} </h2>
              <p className="small m-0 p-0 d-none"><small>{props.desc}</small></p>
            </div>

            <div className="">
              <div className="py-1">
                <IconCancel link={props.link} />
              </div>
            </div>

          </div>

        </div>
        <div className="col"></div>
      </div>
    </div>
  </div>
  </>
  )
}