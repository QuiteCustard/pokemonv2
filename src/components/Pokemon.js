import { useEffect, useRef,  } from "react";
import { useInView } from "react-intersection-observer";

export default function Pokemon({data, pokedexStyle}) {
    return (
        <div className={data.id === 1 ? "pokemon active" : "pokemon"}>
            <img className="pokemon-img" src={data.sprites.other.dream_world.front_default ? data.sprites.other.dream_world.front_default : data.sprites.front_default} alt={data.name + " sprite"} width={pokedexStyle === "gen4" ? "452" : "80"} height={pokedexStyle === "gen4" ? "439" : "80"}/>
            <div className="name-id ">
                <h3 className="pokemon-name">{data.name}</h3>
                <p className="pokemon-id">{pokedexStyle === "gen4" && data.id < 10 ? "0" + data.id : data.id}</p>
            </div>
        </div> 
    )
}