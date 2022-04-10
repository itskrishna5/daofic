// web navigation
import NavsHeaderMain from './navs-header-main';
import WebbIcon from '../webb/webb-icon';
import UserAvatar from '../webb/user-avatar';

export default function WebbHeaderMain(props) {

  const data = props.data;

  return (
    <>
    {/* header-large */}
    <div className="sticky-top border-bottom bg-white d-none d-md-block">
      <div className="container-fluid d-flex justify-content-between py-2" style={{height:'3.7em'}}>
        
        <div className="py-1">
          <WebbIcon />
        </div>
        
        <div className="py-1">
          <NavsHeaderMain />
        </div>
        
        <div className="py-1">
          <UserAvatar />
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
          <UserAvatar />
        </div>
      </div>
    </div>
  
    </>
    )
}