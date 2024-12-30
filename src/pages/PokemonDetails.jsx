import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PokemonDetails() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${name}`
                );
                setPokemon(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pokemon details:', error);
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [name]);

    if (loading) {
        return (
            <div className="text-center mt-8 dark:text-white">Loading...</div>
        );
    }

    if (!pokemon) {
        return (
            <div className="text-center mt-8 dark:text-white">
                Pokemon not found
            </div>
        );
    }

    return (
        <div
            data-aos="fade-up"
            className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 dark:text-white transition-colors"
        >
            <div className="text-center">
                <img
                    src={
                        pokemon.sprites.other['official-artwork'].front_default
                    }
                    alt={pokemon.name}
                    className="w-64 h-64 mx-auto hover:scale-110 transition-transform duration-300"
                    data-aos="zoom-in"
                />
                <h1 className="text-3xl font-bold capitalize mt-4">
                    {pokemon.name}
                </h1>

                <div className="flex justify-center gap-2 mt-4">
                    {pokemon.types.map(type => (
                        <span
                            key={type.type.name}
                            className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white capitalize"
                        >
                            {type.type.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-8" data-aos="fade-up" data-aos-delay="100">
                <h2 className="text-xl font-semibold mb-4">Abilities</h2>
                <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map(ability => (
                        <span
                            key={ability.ability.name}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 dark:text-white rounded-full capitalize"
                        >
                            {ability.ability.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-8" data-aos="fade-up" data-aos-delay="200">
                <h2 className="text-xl font-semibold mb-4">Base Stats</h2>
                <div className="space-y-4">
                    {pokemon.stats.map(stat => (
                        <div key={stat.stat.name}>
                            <div className="flex justify-between mb-1">
                                <span className="capitalize">
                                    {stat.stat.name}
                                </span>
                                <span>{stat.base_stat}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${
                                            (stat.base_stat / 255) * 100
                                        }%`
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;
