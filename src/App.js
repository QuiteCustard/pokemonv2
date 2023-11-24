import {
	useEffect,
	useRef,
	useState
} from "react";

import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import './styles/css/main.css';
import {
	useInView
} from "react-intersection-observer";
import logo from "./assets/images/logo.png";
import Loading from "./components/Loading";
import {
	register
} from 'swiper/element/bundle';
import {
	FreeMode,
	Mousewheel,
	Keyboard
} from 'swiper/modules';
import Swiper from "swiper";
register();

export default function App() {
	const [url, setURL] = useState("https://pokeapi.co/api/v2/pokemon?limit=21");
	const [nextUrl, setNextURL] = useState("");
	const [pokemon, setPokemon] = useState([]);
	const [pokedexStyle, setpokedexStyle] = useState(localStorage.getItem("pokedex-style") ? localStorage.getItem("pokedex-style") : "gen9");
	const pokedexButton = useRef(null);
	const {ref, inView} = useInView({rootMargin: "0px 1000px 0px 0px"});
	const [loading, setLoading] = useState(true);
	const swiper = useRef(null);
	const [initSwiper, setInitSwiper] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		async function getPokemonBatch() {
			setLoading(true);
			const data = await fetch(url, {
				signal
			})
			const {
				next,
				results
			} = await data.json();

			if (results) {
				setNextURL(next);
				setPokemon(p => [...p, ...results]);
				setInitSwiper(true);
				setLoading(false);
			};
		}

		getPokemonBatch();
		return () => controller.abort();
	}, [url])

	useEffect(() => {
		if (inView) setURL(nextUrl);
	}, [nextUrl, inView])

	useEffect(() => {
		setInitSwiper(true);
		localStorage.setItem('pokedex-style', pokedexStyle);
		pokedexButton.current.textContent = `Current Gen: ${pokedexStyle.substring(3)}`;
		document.body.dataset.theme = pokedexStyle;

		setTimeout(function () {
			setLoading(false);
		}, 700)
	}, [pokedexStyle])

	function changePokedexStyle() {
		setLoading(true);
		setTimeout(function () {
			if (pokedexStyle === "gen9") setpokedexStyle("gen4");
			else setpokedexStyle("gen9");
		}, 1500)
	}

	useEffect(() => {
		function getSwiperParams() {
			if (pokedexStyle === "gen9") {
				return {
					direction: "horizontal",
					mousewheel: true,
					keyboard: true,
					freemode: true,
					spaceBetween: 20,
					breakpoints: {
						320: {
							slidesPerView: 2
						},
						559: {
							slidesPerView: 4
						},
						1024: {
							slidesPerView: 6,
						},
						1400: {
							slidesPerView: 8,
						},
						2000: {
							slidesPerView: 10,
						},
					},
					on: {
						init() {
						},
					},
				}
			} else {
				return {
					direction: "vertical",
					mousewheel: true,
					keyboard: true,
					freemode: true,
					spaceBetween: 0,
					breakpoints: {
						320: {
							slidesPerView: 1
						},
						559: {
							slidesPerView: 1
						},
						1024: {
							slidesPerView: 8,
						},
						1400: {
							slidesPerView: 8,
						},
						2000: {
							slidesPerView: 8,
						},
					},
					on: {
						init() {
						},
					},
				}
			}
		}

		if (initSwiper === true) {
			const swiperParams = getSwiperParams();

			Object.assign(swiper.current, swiperParams)
			swiper.current.initialize();

			//Swiper breakpoints don't update unless resize happens - hack to fix it
			swiper.current.swiper.params.breakpoints["320"].slidesPerView = swiperParams.breakpoints["320"].slidesPerView;
			swiper.current.swiper.currentBreakpoint = false;
			swiper.current.swiper.update();
		}
		setInitSwiper(false);
	}, [initSwiper])

	useEffect(() => {
		swiper.current.addEventListener('slidechange', () => {
			swiper.current.querySelectorAll("swiper-slide").forEach(slide => {
				if (slide.role === null) setInitSwiper(true);
			})
		});
	}, [])

	return ( 
		<>
			<Header pokedexStyle={pokedexStyle ? changePokedexStyle : null} pokedexButton={pokedexButton} logo={logo} /> 
			<PokemonList pokemon={pokemon} pokedexStyle={pokedexStyle} listRef={ref} swiper={swiper}/> 
			<Loading loading={loading} />
		</>
	);
}