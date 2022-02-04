import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardKey from "./KeyboardKey";
import Row from "./Row";

export default ({}) => {
	// TODO
	// allow hardware keyboard to be used
	const currentWord = useSelector((state) => state.currentWord);
	const words = useSelector((state) => state.words);
	const nonPlayableWords = useSelector((state) => state.nonPlayableWords);
	const wordsToCheck = [...words, ...nonPlayableWords];
	const grid = useSelector((state) => state.grid);
	const round = useSelector((state) => state.round);
	const msg = useSelector((state) => state.msg);
	const dispatch = useDispatch();

	const type = (letter) => {
		if (grid[round].length < 5) {
			const newGrid = [...grid];
			newGrid[round] += letter;
			dispatch({ type: "SET_GRID", payload: newGrid });
		}
	};
	const enter = () => {
		if (wordsToCheck.includes(grid[round].toLowerCase())) {
			if (grid[round].length === 5) {
				const newGrid = [...grid];
				dispatch({ type: "SET_GRID", payload: newGrid });
				dispatch({ type: "SET_ROUND", payload: round + 1 });
				if (grid[round] === currentWord) {
					dispatch({
						type: "MSG",
						payload: {
							duration: 10000000,
							text: `Correct! in ${round + 1} guesses - refresh to play again`,
						},
					});
				} else {
					if (round >= 5) {
						dispatch({
							type: "MSG",
							payload: {
								duration: 10000000,
								text:
									"The word was " + currentWord + " - refresh to play again",
							},
						});
					}
				}
			}
		} else {
			dispatch({
				type: "MSG",
				payload: { text: "Not in word list", duration: 4000 },
			});
		}
	};
	const backspace = () => {
		if (grid[round].length > 0) {
			const newGrid = [...grid];
			newGrid[round] = newGrid[round].slice(0, -1);
			dispatch({ type: "SET_GRID", payload: newGrid });
		}
	};

	useEffect(() => {
		if (!msg.text) return;
		const id = setTimeout(
			() => dispatch({ type: "MSG", payload: { text: "", duration: 0 } }),
			msg.duration
		);
		return () => clearTimeout(id);
	}, [msg]);

	// const keyPress = ({ key }) => {
	// 	const options = [
	// 		..."abcdefghijklmnopqrstuvwxyz".split(""),
	// 		"Enter",
	// 		"Backspace",
	// 	];
	// 	if (options.includes(key)) {
	// 		if (key === "Enter") enter();
	// 		else if (key === "Backspace") backspace();
	// 		else type(key.toUpperCase());
	// 	}
	// };

	// useEffect(() => {
	// 	document.addEventListener("keypress", keyPress, false);
	// 	// return document.removeEventListener("keypress", keyPress);
	// }, [keyPress]);

	return (
		<div className="game">
			{msg.text && <div className="message">{msg.text}</div>}
			<div className="grid">
				{grid.map((word, index) => {
					return <Row key={`row-${index}`} word={word} index={index} />;
				})}
			</div>
			<div className="keyboard">
				<div className="keyboard-row">
					{"QWERTYUIOP".split("").map((letter) => (
						<KeyboardKey type={type} letter={letter} key={`key-${letter}`} />
					))}
				</div>
				<div className="keyboard-row">
					{"ASDFGHJKL".split("").map((letter) => (
						<KeyboardKey type={type} letter={letter} key={`key-${letter}`} />
					))}
				</div>
				<div className="keyboard-row">
					<div className="keyboard-key double-width" onClick={enter}>
						ENTER
					</div>
					{"ZXCVBNM".split("").map((letter) => (
						<KeyboardKey type={type} letter={letter} key={`key-${letter}`} />
					))}
					<div className="keyboard-key double-width" onClick={backspace}>
						BACK
					</div>
				</div>
			</div>
		</div>
	);
};
