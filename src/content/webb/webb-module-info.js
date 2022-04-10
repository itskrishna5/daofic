//date-time
export default function WebbModuleInfo(props) {
 
  const data = props.data;

  return (
  <>
    <p className="text-color-tone text-center">{data.text || ''}</p>
  </>
  )
}