// section heading

export default function HeaderSectionDark(props) {

  const data = props.data;

  return (
  <>
    <h2 className="fw-bold text-color-dark text-center">{data.text}</h2>
    <div className="pb-3"></div>
  </>
  )
}