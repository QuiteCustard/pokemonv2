export default function Header({logo, imgStyle, imgButton}) {
  return (
      <header>
        <div className="top">
          <img src={logo} alt="Logo" height="100" width="100"></img>
          <button onClick={imgStyle} ref={imgButton} className="button"></button>
        </div>
        <div className="bottom">
          <h1>Pokedex</h1>
        </div>
      </header>
  )
}