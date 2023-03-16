import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import PokemonList from "./Pages/PokemonList/PokemonList";
import Pokemon from "./Pages/Pokemon/Pokemon";
import Home from "./Pages/Home/Home";

import "./App.css";
import SavedPokemon from "./Pages/SavedPokemon/SavedCards";
import { useState } from "react";

function App() {
    const [notifications, setNotifications] = useState(0);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigation notifications={notifications} setNotifications={setNotifications} />}>
                    <Route index element={<Home />} />
                    <Route path="/pokemon-list" element={<PokemonList />} />
                    <Route path="/pokemon-list/:id" element={<Pokemon notifications={notifications} setNotifications={setNotifications} />} />
                    <Route path="/my-pokemon" element={<SavedPokemon notifications={notifications} setNotifications={setNotifications} />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
