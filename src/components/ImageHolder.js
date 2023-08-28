export default function ImageHolder({imgHolder}) {
  return (
    <div className="img-holder">
      <img ref={imgHolder} height="700" width="1000" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"/>
    </div>
  )
}
