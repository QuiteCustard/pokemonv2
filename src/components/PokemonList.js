export default function PokemonList({pokemon}) {
  return (
    <>
      {pokemon.map(p => p.name)}
    </>
  )
}
