//Layout
import WebbHeaderNavsTall from "./webb-header-tall";
import WebbIcon from '../webb/webb-icon-lite';
import UserAvatar from'../webb/user-avatar'; 

export default function ContentFormatXA (props) {
  
  return (
  <>
    {/* nav */}

    {/* content */}
    <div className="sticky-top">
      <div className="container-fluid" style={{height:'100vh'}}>
      <div className="row">

        {/* navbar */}
        <div className="p-0 d-none d-lg-block border-end bg-tint" style={{width:'4.2rem', backgroundColor:'darkblue'}}>
          <div className="d-flex align-items-center flex-column" style={{height:'100vh'}}>
            <div className="p-3">
              
              <WebbIcon/>
              <div className="mt-3 border-bottom"></div>

            </div>

            <div className="p-3 pt-0" style={{overflowY:'auto'}}>

            <WebbHeaderNavsTall/>
            
            </div>

            <div className="mt-auto p-3">
              <UserAvatar />
            </div>
          </div>
        </div>

        {/* sidebar */}
        <div className="p-0 d-none d-lg-block bg-lite" style={{width:'21%'}}>
          <div className="d-flex flex-column" style={{height:'100vh'}}>
            <div className="p-3" >
              
              <div className="" style={{height:'1.4rem'}}>
                {props.sidebar.head}
              </div>
            </div>

            <div className="p-3" style={{overflowY:'auto'}}>
              {props.sidebar.data}
            </div>

            <div className="mt-auto p-3"> 
              {props.sidebar.foot}
            </div>

          </div>
        </div>

        {/* center */}
        <div className="col p-0 border-start border-end">
          <div className="d-flex flex-column" style={{height:'100vh'}}>
            <div className="p-3 align-self-stretch border-bottom">
              
              <div className=""  style={{height:'1.4rem'}}>
                {props.main.head}
              </div>

            </div>
            
            <div className="p-3" style={{overflowY:'auto'}}>
              {props.main.data}
            </div>

          </div>

        </div>

        {/* sidebar */}
        <div className="p-0 d-none d-lg-block bg-lite" style={{width:'24%'}}>

          <div className="d-flex flex-column" style={{height:'100vh'}}>
            
            <div className="p-3 border-bottom">
              <div className="" style={{height:'1.4rem'}}>
                {props.actionbar.head}
              </div>
            </div>
            
            <div className="p-3" style={{overflowY:'auto'}}>
              {props.actionbar.data}
            </div>

          </div>

        </div>
        
      </div>
      </div>
    </div>

    {/* footer */}
  
  </>
  )
}