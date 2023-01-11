import { useEffect, useRef, useState } from "react";
import { getIndividualPokemon } from "../PokemonGetter";

export default function PokemonList({pokemon}) {
	const [individualPokemonData, setIndividualPokemonData] = useState([]);
	const img = useRef(null);
	
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
				<img src={data.sprites.other.dream_world.front_default} alt={data.name + " sprite"} height="100" width="100" ref={img}/>
				<h3>#{data.id < 100 ? 0 : ''}{data.id < 10 ? 0 : ''}{data.id} - {data.name}</h3>
			</div>
		})}
    </div>
  )
}