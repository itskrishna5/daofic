// web navigation
import WebbIcon from '../webb/webb-icon';
import IconCancel from "../webb/icon-cancel";

export default function WebbHeaderInner(props) {

  const data = props.data;

  return (
    <>
    {/* header-large */}
      <div className="sticky-top border-bottom bg-lite">
      <div className="container-fluid d-flex justify-content-between py-2" style={{height:'3.7em'}}>
        
          <div className="py-1">
            <WebbIcon />
          </div>

          {/* center */}  
          <div className="py-2">
            <div className="text-center">
              <h1 className=" text-color-main m-0 p-0">{data.head}</h1>
            </div>
          </div>
  
          <div className="text-end py-1">
            <IconCancel link={data.link}/>
          </div>

        </div>
      </div>
    </>
    )
}