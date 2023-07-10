import { useEffect, useRef, useState } from "react";

import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import ImageHolder from "./components/ImageHolder";
import './styles/css/main.css';
import { useInView } from "react-intersection-observer";
import logo from "./assets/images/logo.png";
import Loading from "./components/Loading";
import { useHorizontalScroll } from "./sideScroller";

export default function App() {
	const [url, setURL] = useState("https://pokeapi.co/api/v2/pokemon?limit=21");
	const [nextUrl, setNextURL] = useState("");
	const [pokemon, setPokemon] = useState([]);
	const [pokedexStyle, setpokedexStyle] = useState(localStorage.getItem("pokedex-style") ? localStorage.getItem("pokedex-style") : "gen9");
	const pokedexButton = useRef(null);
	const [initLoad, setInitLoad] = useState(false);
	const { ref, inView } = useInView({rootMargin: "0px 1000px 0px 0px"});
	const [loading, setLoading] = useState(true);
	const [horizontalScroll, setHorizontal] = useState(true);
	const listScroller = useHorizontalScroll(horizontalScroll);
	const pokemonObserver = useRef();

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		
		async function getPokemonBatch() {
			setLoading(true);
			const data = await fetch(url, { signal })
			const { next, results } = await data.json();

			if (results) { 
				setNextURL(next);
				setPokemon(p => [...p, ...results]);
				setInitLoad(true);
				setLoading(false);
			};
		}
		
		getPokemonBatch();
		return () => controller.abort();
	}, [url])
	
	useEffect(() => {
		if (inView === true && nextUrl !== "") setURL(nextUrl);
	}, [inView])
	
	useEffect(() => {
		localStorage.setItem('pokedex-style', pokedexStyle);
		pokedexButton.current.textContent = `Gen: ${pokedexStyle.substring(3)}`;
		document.body.dataset.theme = pokedexStyle;

		pokedexStyle === "gen9" ? setHorizontal(true) : setHorizontal(false);

		setTimeout(function() {
			setLoading(false);
		}, 700)
	}, [pokedexStyle])
	
	function changePokedexStyle() {
		setLoading(true);
		setTimeout(function() {
			pokedexStyle === "gen9" ? setpokedexStyle("gen4") : setpokedexStyle("gen9");
		}, 1500)
	}

	return (
		<>
			<Header pokedexStyle={pokedexStyle ? changePokedexStyle : null} pokedexButton={pokedexButton} logo={logo}/>
			<div className="main">
				<div className="observer" ref={pokemonObserver}></div>
				<ImageHolder />
				<PokemonList pokemon={pokemon} pokedexStyle={pokedexStyle} listRef={ref} listScroller={listScroller} pokemonObserver={pokemonObserver}/>
			</div>
			<Loading loading={loading} />
		</>
	);
}