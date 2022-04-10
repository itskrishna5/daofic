// section heading

export default function HeadingModule(props) {

  const data = props.data;

  return (
  <>
    <p className=""> 
      { data ? data : 'Heading' }
    </p>
    <div className="mb-3"></div>
  </>
  )
}