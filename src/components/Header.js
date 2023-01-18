export default function Header({logo, imgStyle, imgButton}) {
  return (
      <header>
          <img src={logo} alt="Logo" height="100" width="100"></img>
          <h1>Pokedex</h1>
          <button onClick={imgStyle} ref={imgButton} className="button"></button>
      </header>
  )
}