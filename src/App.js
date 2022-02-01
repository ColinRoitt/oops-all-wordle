import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { words } from "./data/words";
import { nonPlayableWords } from "./data/nonPlayableWords";
import Game from "./components/Game";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: "SET_WORDS", payload: words });
		dispatch({ type: "SET_NON_PLAYABLE_WORDS", payload: nonPlayableWords });
		dispatch({
			type: "SET_CURRENT_WORD",
			// payload: "POOL",
			payload: words[Math.floor(Math.random() * words.length)].toUpperCase(),
		});
	}, []);

	return (
		<div className="App">
			<h1>Collection-of-wordsle</h1>
			<Game />
		</div>
	);
}

export default App;
