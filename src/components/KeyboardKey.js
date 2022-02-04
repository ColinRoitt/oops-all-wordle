import { useSelector } from "react-redux";

export default ({ letter, type }) => {
	const round = useSelector((state) => state.round);
	const currentWord = useSelector((state) => state.currentWord);
	const grid = useSelector((state) => state.grid).slice(0, round);

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

	const color = (() => {
		if (isValidAndCorrectPosition) {
			return "correct";
		}
		if (isValid) {
			return "in-word";
		}
		if (isPlayed) {
			return "used";
		}
		return "";
	})();
	return (
		<div className={`keyboard-key ${color}`} onClick={() => type(letter)}>
			{letter}
		</div>
	);
};
