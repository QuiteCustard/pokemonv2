export default function Header({logo, pokedexStyle, pokedexButton}) {
  return (
      <header>
          <img src={logo} alt="Logo" height="100" width="100"></img>
          <h1>Pokédex</h1>
          <button onClick={pokedexStyle} ref={pokedexButton} className="button"></button>
      </header>
  )
}