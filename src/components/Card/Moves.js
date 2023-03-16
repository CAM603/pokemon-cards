import axios from "axios";
import { useEffect, useState } from "react";
import "./Move.css";

export const Move = ({ moveObj }) => {
    const [move, setMove] = useState({ name: "", desc: "" });

    useEffect(() => {
        fetchMoves(moveObj.url);
    }, [moveObj]);

    const formatMove = (name) => {
        if (name.indexOf("-") !== -1) {
            return name.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1) + " ");
        } else {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
    };
    const fetchMoves = (url) => {
        axios
            .get(url)
            .then((res) => {
                console.log(res.data);
                const moveData = { name: formatMove(res.data.name), desc: res.data.flavor_text_entries[0].flavor_text };
                setMove(moveData);
            })
            .catch((err) => console.log(err));
    };
    return <div className="move">{move.name}</div>;
};
