import "./Image.css";

export const PokemonImage = ({ picture, className }) => {
    return <img className={`${picture.className} ${className}`} id="pokemon-image" alt={picture.alt} src={picture.src}></img>;
};
