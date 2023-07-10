import { useEffect, useState } from "react";
import { getIndividualPokemon } from "../PokemonGetter";
import Pokemon from "./Pokemon";

export default function PokemonList({pokemon, pokedexStyle, listRef, listScroller, pokemonObserver}) {
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
	<div className="pokemon-list" ref={listScroller}>
		{individualPokemonData.map((data) => { 
			return <Pokemon key={data.id} data={data} pokedexStyle={pokedexStyle} pokemonObserver={pokemonObserver} />
		})}
		<div ref={listRef}></div>
	</div>
  )
}
