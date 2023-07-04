import { useEffect, useState } from "react";
import { getIndividualPokemon } from "../PokemonGetter";

export default function PokemonList({pokemon, pokedexStyle, listRef, loading}) {
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
	<div className="pokemon-list">
		<swiper-container init="false" space-between="10" slides-per-view="6" mousewheel="true" free-mode="true">
			{individualPokemonData.map(data => { 
				return <swiper-slide key={data.id} class="pokemon">
					<div className="img-wrapper">
						<img className="pokemon-img" src={data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default} alt={data.name + " sprite"} width="113" height="109"/>
					</div>
					<h3 className="pokemon-name">{data.name}</h3>
					<p className="pokemon-id">{data.id}</p>
				</swiper-slide> 
			})}
			<swiper-slide ref={listRef}></swiper-slide>
		</swiper-container>
	</div>
  )
}