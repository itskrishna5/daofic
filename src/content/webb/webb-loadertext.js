//loader
export default function WebbLoaderText(props) {
 
  return (
  <>
    {/* spinner */}
    <div className="">
      <p className="small text-muted">{props.text ? props.text : 'Please Wait...'}</p>
    </div>
  </>
  )
}