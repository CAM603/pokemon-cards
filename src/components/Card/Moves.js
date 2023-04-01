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

    const findDescription = (descriptions) => {
        const description = descriptions.find((desc) => desc.language.name === "en");
        return description.flavor_text;
    };

    const fetchMoves = (url) => {
        axios
            .get(url)
            .then((res) => {
                const moveData = { name: formatMove(res.data.name), desc: findDescription(res.data.flavor_text_entries) };
                setMove(moveData);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="move">
            {move.name} <span className="desc">{move.desc}</span>
        </div>
    );
};
