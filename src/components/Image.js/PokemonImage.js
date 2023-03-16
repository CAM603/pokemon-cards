import "./Image.css";

export const PokemonImage = ({ picture }) => {
    return <img className={picture.className} id="pokemon-image" alt={picture.alt} src={picture.src}></img>;
};
