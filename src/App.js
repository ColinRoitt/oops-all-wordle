import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { words } from "./data/words";
import { nonPlayableWords } from "./data/nonPlayableWords";

function App() {
	const dispatch = useDispatch();
	dispatch({ type: "SET_WORDS", payload: words });
	dispatch({ type: "SET_NON_PLAYABLE_WORDS", payload: nonPlayableWords });

	return (
		<div className="App">
			<h1>Collection-of-wordsle</h1>
		</div>
	);
}

export default App;
