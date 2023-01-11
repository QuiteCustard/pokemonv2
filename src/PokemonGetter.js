const pokemonAmount = 12;
const baseURL = "https://pokeapi.co/api/v2/";

export const initialURL = `${baseURL}pokemon?limit=${pokemonAmount}`;

export async function getIndividualPokemon(urls) {
    const controller = new AbortController();
	const signal = controller.signal;

    const data = await Promise.all(urls.map(async url => {
        const response = await fetch(url, {signal});
        if (!response.ok) throw new Error('Critical error');
        return response.json();
    }))

    return data;
}