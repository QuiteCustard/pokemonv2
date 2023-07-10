import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Pokemon({data, pokedexStyle, pokemonObserver}) {
    const [ pokemon, inView, entry ] = useInView({rootMargin: "0px 0px 0px 0px", root: pokemonObserver.current});

    useEffect(() => {
        console.log(inView, entry);
    }, [inView])

    return (
        <div className="pokemon" ref={pokemon}>
            <img className="pokemon-img" src={data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default} alt={data.name + " sprite"} width={pokedexStyle === "gen4" ? "452" : "80"} height={pokedexStyle === "gen4" ? "439" : "80"}/>
            <div className="name-id">
                <h3 className="pokemon-name">{data.name}</h3>
                <p className="pokemon-id">{pokedexStyle === "gen4" && data.id < 10 ? "0" + data.id : data.id}</p>
            </div>
        </div> 
    )
}