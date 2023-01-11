import { useEffect, useState } from "react";
import { getIndividualPokemon } from "../PokemonGetter";

export default function PokemonList({pokemon}) {
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
			return <div key={data.id}>
				{data.name}
				<img src={data.sprites.front_default} alt={data.name + " sprite"}/>
			</div>
		})}
    </div>
  )
}