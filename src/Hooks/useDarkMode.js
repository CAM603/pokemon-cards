import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useDarkMode = (initialValue) => {
    const [someValue, setSomevalue] = useLocalStorage("darkMode", initialValue);

    useEffect(() => {
        let body = document.querySelector("body");

        someValue ? body.classList.add("dark-mode") : body.classList.remove("dark-mode");
    }, [someValue]);

    return [someValue, setSomevalue];
};
