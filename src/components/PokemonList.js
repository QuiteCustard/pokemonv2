import { useEffect, useState } from "react";
import { getIndividualPokemon } from "../PokemonGetter";

export default function PokemonList({pokemon, pokedexStyle, listRef, swiper}) {
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
		<swiper-container init="false" ref={swiper} mousewheel={true} keyboard={true} freemode={true}>
			{individualPokemonData.map(data => { 
				return <swiper-slide key={data.id}>
					<div className="pokemon">
						<img className="pokemon-img" src={data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default} alt={data.name + " sprite"} width={pokedexStyle === "gen4" ? "452" : "80"} height={pokedexStyle === "gen4" ? "439" : "80"} />
						<a className="name-id" href="/">
							<h3 className="pokemon-name">{data.name}</h3>
							<p className="pokemon-id">{pokedexStyle === "gen4" && data.id < 100 ? "0" : ''}{pokedexStyle === "gen4" && data.id < 10 ? "0" + data.id : data.id}</p>
						</a>
					</div>
				</swiper-slide> 
			})}
			<swiper-slide ref={listRef}></swiper-slide>
		</swiper-container>
	</div>
  )
}