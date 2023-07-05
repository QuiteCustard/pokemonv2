import { useEffect, useState } from "react";
import { getIndividualPokemon } from "../PokemonGetter";

export default function PokemonList({pokemon, pokedexStyle, listRef, loading, swiper}) {
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
		<swiper-container init="false" ref={swiper}>
			{individualPokemonData.map(data => { 
				return <swiper-slide key={data.id}>
					<div className="pokemon">
						<div className="img-wrapper">
							<img className="pokemon-img" src={data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default} alt={data.name + " sprite"} width={pokedexStyle === "gen4" ? "113" : "80"} height={pokedexStyle === "gen4" ? "109" : "80"}/>
						</div>
						<h3 className="pokemon-name">{data.name}</h3>
						<p className="pokemon-id">{data.id}</p>
					</div>
				</swiper-slide> 
			})}
			<swiper-slide ref={listRef}></swiper-slide>
		</swiper-container>
	</div>
  )
}