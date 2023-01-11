import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import './styles/css/main.css';

export default function App() {
	const [url, setURL] = useState("https://pokeapi.co/api/v2/pokemon?limit=21");
	const [nextUrl, setNextURL] = useState("");
	const { ref, inView } = useInView({threshold: 0});
	const [pokemon, setPokemon] = useState([]);
	const [initLoad, setInitLoad] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		async function getPokemonBatch() {
			const data = await fetch(url, { signal })
			const { next, results } = await data.json();
			setNextURL(next);
			setPokemon(p => [...p, ...results]);
			setInitLoad(true);
		}
		
		getPokemonBatch();

		return () => controller.abort();
	}, [url])

	useEffect(() => {
		if (inView && initLoad) setURL(nextUrl);
	}, [nextUrl, inView, initLoad])
	
	return (
		<>
			<Header />
			<PokemonList pokemon={pokemon} />
			<div ref={ref} className="hide">{inView ? 1 : 0}</div>
		</>
	);
}