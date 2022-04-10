// next
import Blockies from "react-blockies";
import avtx from "../../media/user.png";

const form = [
  {name:'Personal', form:'indx'},
  {name:'Business', form:'bznx'}
]

export default function NextAccounts(props) {

  // console.log (props)

  const stat = (data) =>{
    if (data.hold) 
      return {
        text: 'Account on Hold', 
        icon:'bi-exclamation-circle-fill', colr:'text-danger', 
        actn: false,
        name: 'Select'
      }
    
    if (!data.onbx) 
      return {
        text: 'Incomplete Profile', 
        icon: 'bi-exclamation-circle-fill', colr:'text-danger', 
        actn: true,
        name: 'Update'
      }

    if (data.actv) 
      return {
        text: 'Active', 
        icon: 'bi-circle-fill', colr:'text-success',
        actn: true,
        name: 'Select'
      }
    else 
      return {
        text: 'In Review', 
        icon:'bi-circle-fill', colr:'text-warning',
        actn: false,
        name: 'Select'
    }
  }

  return (
  <>
    <div className={ props.data.length !== 0 ? '': 'd-none'}>
      <p className="text-color-tone fw-bold small text-center">{props.form} Account(s)</p>
        
      {props.data && props.data.length > 0 && props.data.map((item, i) => ( 
        item.form === form.find(item=>item.name===props.form).form ?

      <div className="" 
        style={{cursor:'pointer'}}
        onClick={async () => { props.user(item) }}
        disabled={!stat(item).actn}
        key={i}
      >

        <div className="d-flex bg-wite p-3 py-2 pt-3 rounded-wd mb-3 hilite" >
        
          <div className="m-0">
            <Blockies seed={item.usid || 'wise'} className="identicon rounded-circle m-0" size={9} />
          </div>
          <div className="d-none">
            <img src={avtx} className="rounded-circle shadow-sm" width="42" height="42" alt="..."  ></img>
          </div>
          
          <div className="ps-3">
            <p className="fw-bold m-0 text-sm">{ item.name || 'User Name'}</p>
            <p className={`small text-color-tone m-0`}>
              <span className={`m-0 small`} >
                <i className={`${stat(item).icon} ${stat(item).colr} small`}></i>
              </span>
              <span className="ps-2"></span>
              <span className="m-0">{stat(item).text}</span>
            </p>
          </div>

          <div className="ms-auto m-0 py-2">
            <i className="bi-chevron-right text-tone"></i>
          </div>
        </div>

      </div>
      
      : ''))}

    </div>
  </>
  )
}