import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Button from "@mui/material/Button";

import "./Pokemon.css";
import { Card } from "../../components/Card/Card";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import { AutoAlert } from "../../components/Alert/Alert";

const Pokemon = ({ setNotifications }) => {
    const { id } = useParams();
    const [name, setName] = useState();
    const [pics, setPics] = useState([]);
    const [moves, setMoves] = useState([]);
    const [stats, setStats] = useState([]);
    const [type, setType] = useState();
    const [picIndex, setPicIndex] = useState(2);
    const [moveIndex1, setMoveIndex1] = useState(0);
    const [moveIndex2, setMoveIndex2] = useState(1);
    const [savedPokemon, setSavedPokemon] = useLocalStorage("savedPokemon", []);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => {
                setName(capitalize(res.data.name.split("-")[0]));
                setPics(extractPics(res.data.sprites));
                setMoves(res.data.moves);
                setStats(res.data.stats);
                setType(res.data.types[0].type.name);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const extractPics = (pics) => {
        const images = [];
        (function helper(pics) {
            Object.values(pics).forEach((pic) => {
                if (typeof pic === "object" && pic !== null) {
                    helper(pic);
                } else if (typeof pic === "string") {
                    images.push({ pic: pic });
                }
            });
        })(pics);

        return images;
    };
    const hp = stats.find((el) => el.stat.name === "hp");
    let className = "default";
    switch (type) {
        case "fire":
            className = "fire";
            break;
        case "electric":
            className = "electric";
            break;
        case "grass":
        case "bug":
            className = "leaf";
            break;
        case "water":
        case "ice":
            className = "water";
            break;
        case "psychic":
        case "poison":
        case "ghost":
        case "dark":
            className = "psychic";
            break;
        case "fighting":
        case "ground":
        case "rock":
        case "steel":
            className = "fighting";
            break;
        case "normal":
        case "flying":
        case "dragon":
        case "fairy":
            className = "normal";
            break;
        default:
        // nothing
    }

    const onShowSizeChange = () => {
        setPicIndex((prevIndex) => {
            if (prevIndex === pics.length - 1) {
                return 0;
            } else {
                return prevIndex + 1;
            }
        });
        setMoveIndex1((prevIndex) => {
            if (prevIndex === moves.length - 1) {
                return 0;
            } else {
                return prevIndex + 1;
            }
        });
        setMoveIndex2((prevIndex) => {
            if (prevIndex === moves.length - 1) {
                return 0;
            } else {
                return prevIndex + 1;
            }
        });
    };

    const saveHandler = () => {
        const pokemonData = {
            name: name,
            hp: hp.base_stat,
            className: className,
            sprite: {
                src: pics[picIndex].pic,
                className: className,
                alt: name
            },
            moves: [moves[moveIndex1]?.move, moves[moveIndex2]?.move]
        };
        setSavedPokemon([...savedPokemon, pokemonData]);
        setNotifications((prev) => prev + 1);
        setOpen(true);
    };

    if (pics.length > 0)
        return (
            <div className="pokemon-page">
                <Card
                    pokemon={{
                        name: name,
                        hp: hp.base_stat,
                        className: className,
                        sprite: {
                            src: pics[picIndex].pic,
                            className: className,
                            alt: name
                        },
                        moves: [moves[moveIndex1]?.move, moves[moveIndex2]?.move]
                    }}
                    clickHandler={onShowSizeChange}
                />
                <div className="controls">
                    <Button size="large" className="save-button" variant="contained" onClick={saveHandler}>
                        Save
                    </Button>
                </div>
                <AutoAlert open={open} setOpen={setOpen} message="Pokemon Saved!" severity="success" vertical="bottom" horizontal="left" />
            </div>
        );
};

export default Pokemon;
