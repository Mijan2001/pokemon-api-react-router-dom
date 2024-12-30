import { useState } from 'react';

function PokemonFilters({ onTypeFilter, onSort }) {
    const types = [
        'all',
        'normal',
        'fire',
        'water',
        'grass',
        'electric',
        'ice',
        'fighting',
        'poison',
        'ground',
        'flying',
        'psychic',
        'bug',
        'rock',
        'ghost',
        'dragon',
        'dark',
        'steel',
        'fairy'
    ];

    const sortOptions = [
        {
            disabled: true,
            label: 'Sort By'
        },
        { value: 'name-asc', label: 'Name (A-Z)' },
        { value: 'name-desc', label: 'Name (Z-A)' },
        { value: 'id-asc', label: 'Lowest Number First' },
        { value: 'id-desc', label: 'Highest Number First' }
    ];

    return (
        <div className=" flex flex-col md:flex-row gap-4 mb-6">
            <select
                onChange={e => onTypeFilter(e.target.value)}
                className=" px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus-visible:ring-red-500"
            >
                {types.map(type => (
                    <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                ))}
            </select>

            <select
                onChange={e => onSort(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus-visible:ring-red-500"
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default PokemonFilters;
