import { LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../Hooks/useLocalStorage.js";
import { RotatingImage } from "../../components/Sprite/RotatingImage.js";
import { TypeFilter } from "../../components/Filters/Type";
import "./Home.css";

const Home = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [filters, setFilters] = useState([]);
    const [pokemon, setPokemon] = useLocalStorage("allPokemon", []);
    const [loading, setLoading] = useState(pokemon.length ? false : true);
    const navigate = useNavigate();

    const fetchAll = () => {
        let pokemonList = [];

        const helper = async (link) => {
            return axios
                .get(link)
                .then((res) => {
                    return res;
                })
                .then(async (res) => {
                    Promise.all(
                        res.data.results.map((el) => {
                            return axios
                                .get(el.url)
                                .then((r) => {
                                    // Some Pokemon don't have the front default pic so just find a valid alt
                                    const pic = r.data.sprites.front_default || Object.values(r.data.sprites).find((p) => p.length);
                                    pokemonList.push({ name: r.data.name, pic: pic, id: r.data.id, type: r.data.types[0].type.name });
                                })
                                .catch((e) => console.log(e));
                        })
                    );
                    return res;
                })
                .then(async (res) => {
                    if (res.data.next) {
                        await helper(res.data.next);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        helper(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=60`).then((res) => {
            setPokemon(pokemonList);
            setLoading(false);
            localStorage.setItem("allPokemon", JSON.stringify(pokemonList));
        });
    };

    useEffect(() => {
        if (!pokemon.length) {
            fetchAll();
        }
    }, []);

    // NEEDS WORK
    // const findImage = (obj) => {
    //     if (obj.front_default) {
    //         return obj.front_default;
    //     } else {
    //         const foundPic = Object.values(obj).find((pic) => typeof pic === "string");
    //         if (foundPic) {
    //             return foundPic;
    //         } else {
    //             const joinedObj = Object.values(obj).filter((el) => {
    //                 if (typeof el === "object" && el !== null) {
    //                     return true;
    //                 }
    //             });
    //             console.log(joinedObj);
    //         }
    //     }
    // };

    const setIdCallback = (id) => {
        setTimeout(() => {
            setShowDetails(true);
        }, 500);
        setTimeout(() => {
            navigate(`/pokemon-list/${id}`);
        }, 1500);
    };

    const selectFilter = ({ target: { value } }) => {
        setFilters(value);
    };

    const generateControls = () => (
        <div className={`controls-container fade-in ${showDetails ? "fade-out" : ""}`}>
            <RotatingImage className="main-pokemon" pictures={filteredPics} alt="test" setIdCallback={setIdCallback} />

            <TypeFilter filters={filters} selectFilter={selectFilter} />
        </div>
    );

    const filteredPics = pokemon.filter((pokemon) => {
        if (filters.length) {
            return filters.includes(pokemon.type);
        } else {
            return true;
        }
    });

    return <div className={`home-page ${loading ? "loading" : ""}`}>{loading ? <LinearProgress /> : generateControls()}</div>;
};

export default Home;
