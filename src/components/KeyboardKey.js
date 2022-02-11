import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default ({ letter, type }) => {
	const round = useSelector((state) => state.round);
	const currentWord = useSelector((state) => state.currentWord);
	const grid = useSelector((state) => state.grid).slice(0, round);
	const [color, setColor] = useState("");

	const isPlayed = grid.reduce(
		(acc, word) => acc || word.includes(letter),
		false
	);

	const isValid = grid.reduce(
		(acc, word) => acc || (isPlayed && currentWord.includes(letter)),
		false
	);
	const isValidAndCorrectPosition = grid.reduce(
		(acc, word) =>
			acc ||
			(isValid &&
				word
					.split("")
					.reduce(
						(acc, char, index) =>
							acc || (letter === char && char === currentWord[index]),
						false
					)),
		false
	);

	useEffect(() => {
		setTimeout(() => {
			if (isValidAndCorrectPosition) {
				setColor("correct");
			} else if (isValid) {
				setColor("in-word");
			} else if (isPlayed) {
				setColor("used");
			}
		}, 1600);
	}, [isPlayed, isValid, isValidAndCorrectPosition]);

	return (
		<div className={`keyboard-key ${color}`} onClick={() => type(letter)}>
			{letter}
		</div>
	);
};
