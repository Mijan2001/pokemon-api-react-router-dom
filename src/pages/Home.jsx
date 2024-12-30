import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import PokemonFilters from '../components/PokemonFilters';
import Pagination from '../components/Pagination';
import {
    sortPokemon,
    filterPokemonByType,
    paginatePokemon
} from '../utils/pokemonUtils';

function Home() {
    const [pokemon, setPokemon] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedType, setSelectedType] = useState('all');
    const [sortType, setSortType] = useState('id-asc');
    const [searchTerm, setSearchTerm] = useState('');

    const ITEMS_PER_PAGE = 12;

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(
                    'https://pokeapi.co/api/v2/pokemon?limit=151'
                );
                const results = response.data.results;

                const pokemonData = await Promise.all(
                    results.map(async pokemon => {
                        const detailResponse = await axios.get(pokemon.url);
                        return {
                            id: detailResponse.data.id,
                            name: detailResponse.data.name,
                            image: detailResponse.data.sprites.other[
                                'official-artwork'
                            ].front_default,
                            types: detailResponse.data.types.map(
                                type => type.type.name
                            )
                        };
                    })
                );

                setPokemon(pokemonData);
                setFilteredPokemon(pokemonData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pokemon:', error);
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    useEffect(() => {
        let result = [...pokemon];

        // Apply search filter
        if (searchTerm) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply type filter
        result = filterPokemonByType(result, selectedType);

        // Apply sorting
        result = sortPokemon(result, sortType);

        setFilteredPokemon(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, selectedType, sortType, pokemon]);

    const handleSearch = term => {
        setSearchTerm(term);
    };

    const handleTypeFilter = type => {
        setSelectedType(type);
    };

    const handleSort = sortValue => {
        setSortType(sortValue);
    };

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);
    const paginatedPokemon = paginatePokemon(
        filteredPokemon,
        currentPage,
        ITEMS_PER_PAGE
    );

    return (
        <div>
            <div className="sm:block, md:flex md:justify-between md:items-center mb-6">
                <div className="mb-6">
                    <SearchBar onSearch={handleSearch} />
                </div>

                <PokemonFilters
                    onTypeFilter={handleTypeFilter}
                    onSort={handleSort}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedPokemon.map(pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>

            {filteredPokemon.length > ITEMS_PER_PAGE && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}

export default Home;
