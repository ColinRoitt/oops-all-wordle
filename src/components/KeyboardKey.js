import { useSelector } from "react-redux";

export default ({ letter, type }) => {
	const round = useSelector((state) => state.round);
	// const grid = useSelector((state) => state.grid);
	const currentWord = useSelector((state) => state.currentWord);
	const grid = useSelector((state) => state.grid).slice(0, round);
	// console.log(grid);

	const isPlayed = grid.reduce(
		(acc, word) => acc || word.includes(letter),
		false
	);
	// const isValid = currentWord.includes(letter);
	const isValid = grid.reduce(
		(acc, word) => acc || (isPlayed && currentWord.includes(letter)),
		false
	);
	const isValidAndCorrectPosition = grid.reduce(
		(acc, word) =>
			acc || (isPlayed && currentWord.indexOf(letter) === word.indexOf(letter)),
		false
	);

	// console.log(letter, isValid, isPlayed);
	const color = (() => {
		if (isValidAndCorrectPosition) {
			return "key-correct";
		}
		if (isValid) {
			return "key-in-word";
		}
		if (isPlayed) {
			return "key-used";
		}
		return "";
	})();
	return (
		<div className={`keyboard-key ${color}`} onClick={() => type(letter)}>
			{letter}
		</div>
	);
};
