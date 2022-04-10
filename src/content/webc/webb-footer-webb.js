// web footer
import WebbDividerMedium from "../webb/webb-divider-md";
import WebbDividerSmall from "../webb/webb-divider-sm";

export default function WebbFooterWebb(props) {

  const data = props.data;

  return (
    <>
    {/* footer */}
    <div className="border-top bg-lite">
      <WebbDividerMedium />
      <div className="container text-main mb-3">
          <div className="row">
            <div className="col-1" ></div>
            <div className="col" >
            <p className="caption-md text-center fw-bold m-0">
              {process.env.REACT_APP_WEBB_SITE_NAME}
            </p>
            <p className="lead text-center">
              {process.env.REACT_APP_WEBB_SITE_LINE}
            </p>
            </div>

            <div className="col-1"></div>
          </div>    

      </div>

      <WebbDividerMedium />
    </div>
  
    <div className="border-top back-color-dark">
      <WebbDividerMedium />
      <div className="container text-color-lite mb-3">
          <div className="row">
            <div className="col-1" ></div>
            <div className="col" >
            <p className="small text-center">Ⓒ Wize 2022</p>
            <p className="small text-center d-none">
            NIMBL SOLUTION PTE. LTD. -  
            160 ROBINSON ROAD,
            #14-04 SINGAPORE BUSINESS FEDERATION CENTER,
            SINGAPORE (068914)
            </p>
            </div>

            <div className="col-1"></div>
          </div>    

      </div>

      <WebbDividerSmall />
    </div>

    </>
    )
}