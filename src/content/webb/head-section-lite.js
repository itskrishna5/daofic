// section heading

export default function HeaderSectionLite(props) {

  const data = props.data;

  return (
  <>
    <h2 className="text-color-main">{data.name}</h2>
    <div className="mb-3"></div>
  </>
  )
}