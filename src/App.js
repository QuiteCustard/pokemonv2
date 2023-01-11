import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
//import { initialURL } from "./PokemonGetter";
import './styles/css/main.css';

export default function App() {
	//const getPokemonURL = useRef(initialURL);
	const [url, setURL] = useState("https://pokeapi.co/api/v2/pokemon?limit=21");
	const [nextUrl, setNextURL] = useState();
	const { ref, inView } = useInView({
		threshold: 0
	  });
	const [pokemon, setPokemon] = useState([]);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		async function getPokemonBatch() {
			//const data = await fetch(getPokemonURL.current, { signal })
			const data = await fetch(url, { signal })
			const { next, results } = await data.json();
			
			setNextURL(next);
			setPokemon(results);
		}
		
		getPokemonBatch();

		return () => controller.abort();
	}, [url])

	return (
		<>
			<Header />
			<PokemonList pokemon={pokemon} />
			<div ref={ref} className="hide">1</div>
		</>
	);
}