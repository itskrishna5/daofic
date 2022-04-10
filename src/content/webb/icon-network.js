// network
import avtx from '../../media/iconlite.png';
import avax from '../../media/avax.png';
import celo from '../../media/celo.png';
import ether from '../../media/ether.png';
import matic from '../../media/matic.png';
import metis from '../../media/metis.png';

const size = {sm:15, md:24, wd: 33, xl: 42}

export default function IconNetwork(props) {

  const data = props.data;

  if (!data.ntwk || data.ntwk==='')
  return (
  <>
    <div className="">
      <img src={avtx} 
        height={size[data.size]} width={size[data.size]} 
        className="rounded-circle shadow-sm" alt="...">
      </img>
    </div>
  </>
  )

  if (['0xa86a','0xa869'].includes(data.ntwk))
  return (
  <>
    <div className="">
      <img src={avax} 
        height={size[data.size]} width={size[data.size]} 
        className="rounded-circle shadow-sm" alt="...">
      </img>
    </div>

  </>
  )

  if (['0x1','0x2', '0x4', '0x24'].includes(data.ntwk))
  return (
  <>
    <div className="">
      <img src={ether} 
        height={size[data.size]} width={size[data.size]} 
        className="rounded-circle shadow-sm" alt="...">
      </img>
    </div>

  </>
  )

  if (['0x89','0x13881'].includes(data.ntwk))
  return (
  <>
    <div className="">
      <img src={matic} 
        height={size[data.size]} width={size[data.size]} 
        className="rounded-circle shadow-sm" alt="...">
      </img>
    </div>

  </>
  )



}