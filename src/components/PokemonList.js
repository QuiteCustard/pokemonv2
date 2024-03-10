import { useEffect, useState } from "react";
import { getIndividualPokemon } from "../PokemonGetter";

export default function PokemonList({pokemon, pokedexStyle, listRef, updateSwiper, swiper}) {
	const [individualPokemonData, setIndividualPokemonData] = useState([]);

	useEffect(() => {
		swiper.current.addEventListener('slidechange', () => {
			swiper.current.querySelectorAll("swiper-slide").forEach(slide => {
				if (slide.role === null) updateSwiper(true);
			})
		});
	}, [])

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
			{individualPokemonData.map(data => (
				<swiper-slide key={data.id}>
					<article className="pokemon">
						{pokedexStyle === "gen4" ? 
							<a href="/" className="img-link">
								<img className="pokemon-img" src={data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default} alt={data.name + " sprite"} 
								width={pokedexStyle === "gen4" ? "452" : "80"} height={pokedexStyle === "gen4" ? "439" : "80"} />
							</a> 
						:
							<img className="pokemon-img" src={data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default} alt={data.name + " sprite"} 
							width={pokedexStyle === "gen4" ? "452" : "80"} height={pokedexStyle === "gen4" ? "439" : "80"} />
						}
						
						<a className="name-id" href="/">
							<h3 className="pokemon-name">{data.name}</h3>
							<p className="pokemon-id">{pokedexStyle === "gen4" && data.id < 100 ? "0" : ''}{pokedexStyle === "gen4" && data.id < 10 ? "0" + data.id : data.id}</p>
						</a>
					</article>
				</swiper-slide> 
			))}
			<swiper-slide ref={listRef}></swiper-slide>
		</swiper-container>
	</div>
  )
}