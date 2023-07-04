export default function Loading({loading}) {
  return (
    <div id="loading-cover" className={loading ? "open" : ""}>
        <p>Loading...</p>
    </div>
  )
}
