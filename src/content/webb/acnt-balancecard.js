// account balance
import {crnc, moment} from '../../services/srvc-utilities';

export default function AccountBalanceCard(props) {
  
  const data = props.data;

  return (
  <>

      <div className="d-none d-md-block">
        <div className="">
          <p className="fw-bold text-muted m-0 p-0">Credit</p>
          <p className="caption-md m-0 p-0">{crnc(data.acbl)}</p>
          <p className="small m-0 p-0"><small>{moment(data.mots)}</small></p>
        </div>
      </div>
      
      <div className="container-fluid d-md-none">
        <div className="d-flex bg-primary rounded-wd p-3 text-white">
          <div className="me-auto">
            <p className="fw-bold m-0 p-0">Ac Balance</p>
            <p className="small m-0 p-0"><small>{(data.mots)}</small></p>
          </div>

          <div className="">
          <p className="caption-md fw-bold m-0 p-0">{crnc(data.acbl)}</p>
          </div>
        </div>
      </div>

  </>
  )
}