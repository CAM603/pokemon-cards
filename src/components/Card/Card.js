import { PokemonImage } from "../Image.js/PokemonImage.js";
import { Move } from "./Moves.js";
import "./Card.css";
export const Card = ({ pokemon, className, clickHandler }) => {
    return (
        <div className={`card-container ${className}`} onClick={clickHandler}>
            <div className={`pokemon-card ${pokemon.className}`}></div>
            <div className={`name ${pokemon.name.length > 17 ? "long" : "short"}`}>{pokemon.name}</div>
            <div className="hp">{pokemon.hp} HP</div>
            <div className={`sprite-container`}>
                <PokemonImage picture={pokemon.sprite} />
            </div>
            <div className="moves-container">
                <div className="moves">
                    {pokemon.moves[0] && <Move moveObj={pokemon.moves[0]} />}
                    {pokemon.moves[1] && <Move moveObj={pokemon.moves[1]} />}
                </div>
            </div>
        </div>
    );
};
