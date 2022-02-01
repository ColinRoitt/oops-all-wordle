import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
	const dispatch = useDispatch();
	dispatch({ type: "SET_WORDS", payload: "Hello World" });
	const n = useSelector((s) => s.words);
	return (
		<div className="App">
			<h1>Collection-of-wordsle</h1>
		</div>
	);
}

export default App;
