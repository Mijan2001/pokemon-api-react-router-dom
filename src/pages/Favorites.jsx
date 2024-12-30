import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(
            localStorage.getItem('favorites') || '[]'
        );
        setFavorites(storedFavorites);
    }, []);

    if (favorites.length === 0) {
        return (
            <div className="text-center mt-8 dark:text-white">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">
                    Your Favorites
                </h2>
                <p>
                    No favorite Pokémon yet. Start adding some from the home
                    page!
                </p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
                Your Favorites
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {favorites.map(pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
}

export default Favorites;
