//loader
export default function WebbSpinText() {
 
  return (
  <>
    {/* spinner */}
    <div className="spinner-border  spinner-border-sm text-tone" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <span className="text-color-tone"> Please Wait...</span>
  </>
  )
}