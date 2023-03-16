import { useEffect, useState, useRef, useCallback } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export const RotatingImage = ({ pictures, alt, setIdCallback, className }) => {
    const indexRef = useRef(0);
    let intervalRef = useRef();
    const [time, setTime] = useState(Date.now());

    const createInterval = useCallback(() => {
        return setInterval(() => {
            setTime(Date.now());
            indexRef.current = Math.floor(Math.random() * pictures.length);
        }, 1500);
    }, [pictures.length]);

    useEffect(() => {
        intervalRef.current = createInterval();
        return () => {
            console.log("cleared");
            clearInterval(intervalRef.current);
        };
    }, [createInterval]);

    const toggleInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        } else {
            intervalRef.current = createInterval();
        }
        const image = document.getElementById("pokemon-image");
        image.classList.add("bounce");

        if (setIdCallback) {
            setIdCallback(pictures[indexRef.current].id);
        }
        setTimeout(() => {
            image.classList.remove("bounce");
        }, 1000);
    };
    // console.log(pictures);

    return (
        <Box sx={{ width: "100%", paddingBottom: "4rem", textAlign: "center" }}>
            {pictures.length > 0 && pictures[indexRef.current]?.pic ? (
                <img className={className} id="pokemon-image" onClick={toggleInterval} alt={alt} src={pictures[indexRef.current]?.pic}></img>
            ) : (
                <LinearProgress />
            )}
        </Box>
    );
};
