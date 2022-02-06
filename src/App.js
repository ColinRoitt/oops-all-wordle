import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector, useStore } from "react-redux";
import { words } from "./data/words";
import { nonPlayableWords } from "./data/nonPlayableWords";
import Game from "./components/Game";

function App() {
	const dispatch = useDispatch();

	const [lightMode, setLightMode] = useState(
		!!JSON.parse(localStorage.getItem("lightMode"))
	);

	const toggleLightMode = () => {
		setLightMode(!lightMode);
		localStorage.setItem("lightMode", !lightMode);
	};

	const intialiseLocalStorage = () => {
		const currentSaveGames = localStorage.getItem("savedGames");
		if (!currentSaveGames) {
			localStorage.setItem("savedGames", JSON.stringify([]));
		}
	};

	useEffect(() => {
		dispatch({ type: "SET_WORDS", payload: words });
		dispatch({ type: "SET_NON_PLAYABLE_WORDS", payload: nonPlayableWords });
		dispatch({
			type: "SET_CURRENT_WORD",
			// payload: "POISE",
			payload: words[Math.floor(Math.random() * words.length)].toUpperCase(),
		});
		intialiseLocalStorage();
	}, []);

	return (
		<div className={`App ${lightMode ? "light-mode" : ""}`}>
			<div className="header">
				<div className="spacer">C</div>
				<h1>Collection-of-wordsle</h1>
				<i onClick={toggleLightMode} className="fas fa-lightbulb"></i>
			</div>
			<Game />
		</div>
	);
}

export default App;
