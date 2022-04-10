//Layout

export default function ContentFormatXZ (props) {

  return (
    <>
      {/* nav */}

      {/* content */}
      <div className={`container-fluid ${props.form==='wide' ? '' : 'd-none'}`}>
        {props.data}
      </div>

      <div className={`container-fluid ${props.form==='medium' ? '' : 'd-none'}`}>
        <div className="row">
          <div className="d-none d-lg-block" style={{width:'24%'}}></div>
          <div className="d-none d-md-block d-lg-none" style={{width:'0%'}}></div>
          <div className="col">{props.data}</div>
          <div className="d-none d-md-block d-lg-none" style={{width:'0%'}}></div>
          <div className="d-none d-lg-block" style={{width:'24%'}}></div>
        </div>
      </div>

      <div className={`container-fluid ${props.form==='small' ? '' : 'd-none'}`}>
        <div className="row">
          <div className="d-none d-lg-block" style={{width:'33%'}}></div>
          <div className="d-none d-md-block d-lg-none" style={{width:'24%'}}></div>
          <div className="col">{props.data}</div>
          <div className="d-none d-md-block d-lg-none" style={{width:'24%'}}></div>
          <div className="d-none d-lg-block" style={{width:'33%'}}></div>
        </div>
      </div>
    
      <div className={`container-fluid ${props.form==='mini' ? '' : 'd-none'}`}>
        <div className="row">
          <div className="d-none d-lg-block" style={{width:'37%'}}></div>
          <div className="d-none d-md-block d-lg-none" style={{width:'27%'}}></div>
          <div className="col">{props.data}</div>
          <div className="d-none d-md-block d-lg-none" style={{width:'27%'}}></div>
          <div className="d-none d-lg-block" style={{width:'37%'}}></div>
        </div>
      </div>

    </>
    )
  }