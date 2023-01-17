import { useEffect, useState } from "react";
import { getIndividualPokemon } from "../PokemonGetter";

export default function PokemonList({pokemon, imgStyle}) {
	const [individualPokemonData, setIndividualPokemonData] = useState([]);

	useEffect(() => {
		const urls = pokemon.map(mon => mon.url);
		async function getData() {
			const data = await getIndividualPokemon(urls);
			setIndividualPokemonData(data);
		}

		getData();
	}, [pokemon])
  return (
    <div className="list">
		{individualPokemonData.map(data => { 
			return <div key={data.id} className="pokemon">
				<div className="image-name">
					<img src={imgStyle === "default" ? data.sprites.front_default : imgStyle === "alt" && data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default} alt={data.name + " sprite"}/>
					<h3>{data.name}</h3>
				</div>
				<p>{data.id}</p>
			</div> 
		})}
    </div>
  )
}
