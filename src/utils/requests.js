import axios from "axios";

export const getAllPokemon = () => {
    let p;
    axios
        .get(`https://pokeapi.co/api/v2/pokemon`)
        .then((res) => {
            p = res;
        })
        .catch((err) => {
            return err;
        });
    return p;
};
