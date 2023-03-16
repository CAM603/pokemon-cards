import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let cancel;
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=20`, {
                cancelToken: new axios.CancelToken((c) => (cancel = c))
            })
            .then((res) => {
                console.log(res);
                setLoading(false);
                setPokemon(res.data.results.map((pokemon) => pokemon.name));
                //   setPokemonInfo(res.data.results.map(pokemon => pokemon.url))
            })
            .catch((err) => {
                console.log(err);
            });
        return () => cancel();
        console.log("RAN");
    }, [page]);

    function goToNextPage() {
        setPage((page) => page + 20);
    }
    function goToPrevPage() {
        setPage((page) => page - 20);
    }

    if (loading) return "Loading....";

    const showPrev = page > 0 ? goToPrevPage : null;
    const showNext = page < 964 ? goToNextPage : null;

    return (
        <div className="list">
            {pokemon.map((pokemon, index) => (
                <PokemonDetails key={index} pokemon={pokemon} index={index} page={page} />
            ))}
            {showPrev && <button onClick={goToPrevPage}>Prev</button>}
            {showNext && <button onClick={goToNextPage}>Next</button>}
        </div>
    );
};
function PokemonDetails({ page, index, pokemon }) {
    return (
        <Link to={`/pokemon-list/${index + page + 1}`}>
            <p>{pokemon}</p>
        </Link>
    );
}

export default PokemonList;
