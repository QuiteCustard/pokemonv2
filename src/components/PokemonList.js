import { useEffect, useState, useRef } from "react";
import { getIndividualPokemon } from "../PokemonGetter";
import Pokemon from "./Pokemon";

export default function PokemonList({pokemon, pokedexStyle, listRef, listScroller, pokemonObserver}) {
	const [individualPokemonData, setIndividualPokemonData] = useState([]);
	const [monList, setMonList] = useState(false);

	useEffect(() => {
		const urls = pokemon.map(mon => mon.url);

		async function getData() {
			const data = await getIndividualPokemon(urls);
			setIndividualPokemonData(data);
		}

		getData();

		function checkOverlap(mon) {
			const observerCords = pokemonObserver.current.getBoundingClientRect();
			const monCords = mon.getBoundingClientRect();
	
			if ((observerCords.top + observerCords.height) < monCords.top || observerCords.top > (monCords.top + monCords.height) || (observerCords.left + observerCords.width) < monCords.left || observerCords.left > (monCords.left + monCords.width)) pokemonObserver.current.dataset.tester = mon.querySelector("img").src;
		}

		if (monList === true) {
			listScroller.current.addEventListener("scroll", () => {
				listScroller.current.querySelectorAll(".pokemon").forEach(mon => checkOverlap(mon));
			})
		}
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
