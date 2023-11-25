export default function Header({logo, pokedexStyle, pokedexButton}) {
  return (
      <header>
          <img src={logo} alt="Logo" height="75" width="75"></img>
          <h1>Pokédex</h1>
          <button onClick={pokedexStyle} ref={pokedexButton} className="button"></button>
      </header>
  )
}