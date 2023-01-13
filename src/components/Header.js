export default function Header({imgStyle, imgButton}) {
  return (
      <header>
          <img src="" alt="Logo" height="100" width="100"></img>
          <h1>Pokedex</h1>
          <button onClick={imgStyle} ref={imgButton}></button>
      </header>
  )
}