import { useEffect, useState } from "react";
import { getIndividualPokemon } from "../PokemonGetter";
import Pokemon from "./Pokemon";

export default function PokemonList({pokemon, pokedexStyle, listRef, listScroller, pokemonObserver, imgHolder}) {
	const [individualPokemonData, setIndividualPokemonData] = useState([]);
	const [monList, setMonList] = useState(false);

	useEffect(() => {
		const urls = pokemon.map(mon => mon.url);

		async function getData() {
			const data = await getIndividualPokemon(urls);
			setIndividualPokemonData(data);
		}

		getData();

		function checkOverlap(mon, monCords) {
			const observerCords = pokemonObserver.current.getBoundingClientRect();

			if (document.querySelector(".pokemon.active")) document.querySelector(".pokemon.active").classList.remove("active");

			if ((monCords.top + 16) > observerCords.top && monCords.bottom < observerCords.bottom) {
				imgHolder.current.src = mon.querySelector("img").src;
				mon.classList.add("active");
			}
		}

		if (monList === true) listScroller.current.addEventListener("scroll", () => listScroller.current.querySelectorAll(".pokemon").forEach(mon => {
			const monCords = mon.getBoundingClientRect();
			if (monCords.top < 150) checkOverlap(mon, monCords);	
		}));
	}, [pokemon])
	
    useEffect(() => {
		if (listScroller.current !== null) setMonList(true);
    }, [listScroller])

  return (
	<div className="pokemon-list" ref={listScroller}>
		{individualPokemonData.map((data) => { 
			return <Pokemon key={data.id} data={data} pokedexStyle={pokedexStyle}/>
		})}
		<div ref={listRef}></div>
	</div>
  )
}
