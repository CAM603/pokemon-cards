import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import "./Pokemon.css";
import { Card } from "../../components/Card/Card";
import { Fab } from "@mui/material";
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

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
    const [activeStep, setActiveStep] = useState(0);
    const [savedPokemon, setSavedPokemon] = useLocalStorage("savedPokemon", []);

    const theme = useTheme();

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => {
                console.log(res);
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

    const handleNext = () => {
        onShowSizeChange();
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep === 9) {
                return 0;
            } else {
                return prevActiveStep + 1;
            }
        });
    };

    const handleBack = () => {
        onShowSizeChange();
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // TODO
    // const handleStepChange = (step) => {
    //     onShowSizeChange()
    //     setActiveStep(step);
    // };

    const onShowSizeChange = () => {
        setPicIndex(Math.floor(Math.random() * pics.length));
        setMoveIndex1(Math.floor(Math.random() * moves.length));
        setMoveIndex2(Math.floor(Math.random() * moves.length));
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
            moves: [moves[moveIndex1].move, moves[moveIndex2].move]
        };
        setSavedPokemon([...savedPokemon, pokemonData]);
        setNotifications((prev) => prev + 1);
    };

    if (pics.length > 0)
        return (
            <div className="pokemon-page">
                {/* DO LATER */}
                {/* Create a list of posssible combinations and then map through them below */}

                {/* <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {images.map((step, index) => (
                        <div key={step.label}>
                            {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                height: 255,
                                display: 'block',
                                maxWidth: 400,
                                overflow: 'hidden',
                                width: '100%',
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                            ) : null}
                        </div>
                        ))}
                    </AutoPlaySwipeableViews> */}
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
                        moves: [moves[moveIndex1].move, moves[moveIndex2].move]
                    }}
                    saveHandler={saveHandler}
                />
                <div className="controls">
                    {/* <Pagination
                        onChange={onShowSizeChange}
                        responsive={true}
                        pageSize={1}
                        defaultCurrent={1}
                        total={5}
                        showQuickJumper={false}
                        hideOnSinglePage={true}
                    />
                    <Button className="button" onClick={saveHandler} type="primary" shape="round" icon={<DownloadOutlined />} size="large">
                        Save
                    </Button> */}
                    <Fab
                        sx={{
                            color: "white",
                            backgroundColor: "#E5082A"
                        }}
                        className="fab"
                        onClick={saveHandler}
                    >
                        <AddRoundedIcon className="icon" fontSize="medium" />
                    </Fab>
                    <MobileStepper
                        steps={10}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button style={{ backgroundColor: "#3269B2" }} size="medium" variant="contained" onClick={handleNext}>
                                Next
                                {/* {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />} */}
                            </Button>
                            // <KeyboardArrowRight />
                        }
                        backButton={
                            <Button className="back-button" size="medium" variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
                                {/* {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} */}
                                Back
                            </Button>
                            // <KeyboardArrowLeft />
                        }
                    />
                </div>
            </div>
        );
};

export default Pokemon;
