// next intro
import WebbDividerSmall from "./webb-divider-sm"

const stat =[
  {
    stat:'new', 
    name:'Welcome Onboard', shrt:'New Account', 
    desc:'Please use the Create Account Link below to setup your account.', 
    icon:'bi-gift', colr:'text-success',
    avtr:'https://img.freepik.com/free-vector/colorful-pattern-young-people_23-2148218147.jpg?w=330'
  },
  {
    stat:'incomplete', 
    name:'Profile Incomplete', shrt:'Incomplete Account Information', 
    desc:'Please use the Update Account Information Link below to complete your account setup.', 
    icon:'bi-exclamation-circle', colr:'text-danger',
    avtr:'https://img.freepik.com/free-vector/colorful-pattern-young-people_23-2148218147.jpg?w=330'
  },
  {
    stat:'review', 
    name:'Account In Review', shrt:'We are reviewing your account information', 
    desc:'Once your account review is completed, we will notify you of the same.', 
    icon:'bi-shield-fill-check', colr:'text-color-main',
    avtr:'https://img.freepik.com/free-vector/colorful-pattern-young-people_23-2148218147.jpg?w=330'
  },
  {
    stat:'hold', 
    name:'Account On Hold', shrt:'We are reviewing your account information', 
    desc:'Once your account review is completed, we will notify you of the same.', 
    icon:'bi-shield-fill-exclamation', colr:'text-warning',
    avtr:'https://img.freepik.com/free-vector/colorful-pattern-young-people_23-2148218147.jpg?w=330'
  },  
]


export default function NextIntro(props) {
 
  const next = stat.find (item=> item.stat === props.stat)

  return (
  <>
    <div className="">
      <div className="media-square">
        <img src={next.avtr} className='rounded-top img-fluid'></img>
      </div>

      <div className="bg-white rounded-bottom text-center p-3">
        <p className="lead m-0 p-0 pt-2" style={{lineHeight:'1'}}>{next.name}</p>
        <small className="text-muted">{next.shrt}</small>
      </div>

      <div className="d-flex rounded bg-wite p-3 d-none">
        <div className="">
          <i className={`${next.icon} ${next.colr}`}  
            style={{fontSize:"2.4em", }}>
          </i>
        </div>
        <div className="ps-3">
          <p className="lead m-0 p-0 pt-2" style={{lineHeight:'1'}}>{next.name}</p>
          <small className="text-muted">{next.shrt}</small>
        </div>
      </div>    

      <WebbDividerSmall />
      <p className="text-center m-0 d-none">{next.desc}</p>

    </div>

  </>
  )
}