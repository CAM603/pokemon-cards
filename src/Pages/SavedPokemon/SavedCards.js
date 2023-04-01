import React, { useEffect } from "react";
import { useLocalStorage } from "../../Hooks/useLocalStorage.js";
import { Card } from "../../components/Card/Card.js";
import "./SavedCard.css";

const SavedPokemon = ({ setNotifications, notifications }) => {
    const [savedPokemon, setSavedPokemon] = useLocalStorage("savedPokemon", []);

    useEffect(() => {
        if (notifications > 0) {
            setNotifications(0);
        }
    }, []);

    return (
        <div className="saved-page fade-in">
            {savedPokemon.map((pokemon) => {
                return <Card pokemon={pokemon} key={pokemon.name} />;
            })}
        </div>
    );
};

export default SavedPokemon;
