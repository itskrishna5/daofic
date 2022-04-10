// web navigation
import Blockies from "react-blockies";

import NavsHeaderWebb from './navs-header-webb';
import WebbIcon from '../webb/webb-icon';
import UserAvatar from '../webb/user-avatar';

export default function WebbHeaderWebb(props) {

  const data = props.data;

  return (
    <>
    {/* header-large */}
    <div className="sticky-top border-bottom bg-white d-none d-md-block">
      <div className="container d-flex justify-content-between py-2" style={{height:'3.7em'}}>
        
        <div className="py-1">
          <WebbIcon />
        </div>
        
        <div className="py-1">
          <NavsHeaderWebb />
        </div>
        
        <div className="py-1">
          <Blockies seed={'Wize'} className="identicon rounded-circle m-0" size={7} />
          {/* <UserAvatar /> */}
        </div>
      </div>
    </div>
  
    {/* header-small */}
    <div className="sticky-top border-bottom bg-white d-md-none">
      <div className="container-fluid d-flex justify-content-between py-2" style={{height:'3.7em'}}>
        
        <div className="py-1">
          <WebbIcon />
        </div>
        
        <div className="py-2">
          <h2 className="text-color-main">
            {data.head}
          </h2>
        </div>
        
        <div className="py-1">
          <Blockies seed={'Wize'} className="identicon rounded-circle m-0" size={7} />
          {/* <UserAvatar /> */}
        </div>
      </div>
    </div>
  
    </>
    )
}