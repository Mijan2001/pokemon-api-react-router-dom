import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PokemonCard({ pokemon }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === pokemon.id));
    }, [pokemon.id]);

    const toggleFavorite = e => {
        e.preventDefault();
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (isFavorite) {
            const newFavorites = favorites.filter(fav => fav.id !== pokemon.id);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        } else {
            favorites.push(pokemon);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }

        setIsFavorite(!isFavorite);
    };

    return (
        <div className="block">
            <div
                data-aos="fade-up"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all p-4 h-full dark:text-white"
            >
                <div className="relative aspect-square">
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                    />
                    <button
                        onClick={toggleFavorite}
                        className={`absolute top-2 right-2 p-2 text-2xl ${
                            isFavorite
                                ? 'text-red-500'
                                : 'text-gray-400 dark:text-gray-500'
                        }`}
                    >
                        ♥
                    </button>
                </div>
                <h2 className="text-xl font-semibold text-center mt-4 capitalize">
                    {pokemon.name}
                </h2>
                <div className="flex justify-center gap-2 mt-2 flex-wrap">
                    {pokemon.types.map(type => (
                        <span
                            key={type}
                            className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 capitalize"
                        >
                            {type}
                        </span>
                    ))}
                    <Link
                        to={`/pokemon/${pokemon.name}`}
                        className="text-blue-400 hover:underline"
                    >
                        view details...
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;
