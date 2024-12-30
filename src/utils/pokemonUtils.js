export const sortPokemon = (pokemon, sortType) => {
    const pokemonCopy = [...pokemon];

    switch (sortType) {
        case 'name-asc':
            return pokemonCopy.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return pokemonCopy.sort((a, b) => b.name.localeCompare(a.name));
        case 'id-asc':
            return pokemonCopy.sort((a, b) => a.id - b.id);
        case 'id-desc':
            return pokemonCopy.sort((a, b) => b.id - a.id);
        default:
            return pokemonCopy;
    }
};

export const filterPokemonByType = (pokemon, type) => {
    if (type === 'all') return pokemon;
    return pokemon.filter(p => p.types.includes(type));
};

export const paginatePokemon = (pokemon, page, itemsPerPage) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return pokemon.slice(start, end);
};
