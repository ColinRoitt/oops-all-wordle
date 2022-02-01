import { useDispatch, useSelector } from "react-redux";

export default ({ letter = "", positionIndex = -1, reveal = true, row }) => {
	const currentWord = useSelector((state) => state.currentWord);
	const guess = useSelector((state) => state.grid)[row];
	const isCurrentLetterUsed = currentWord.includes(letter);
	const isInCorrectPosition = letter === currentWord[positionIndex];

	const timesLetterInGuess = guess
		.split("")
		.reduce((acc, lett) => (lett === letter ? acc + 1 : acc), 0);

	const timesLetterInWord = currentWord
		.split("")
		.reduce((acc, lett) => (lett === letter ? acc + 1 : acc), 0);

	const color = (() => {
		if (isInCorrectPosition && reveal) {
			return "correct";
		}
		if (
			isCurrentLetterUsed &&
			reveal &&
			!(timesLetterInGuess > timesLetterInWord)
		) {
			return "used";
		}
		return "";
	})();
	return (
		<div className={`cell ${color}`}>
			<div className={`cell-content`}>
				<p>{letter}</p>
			</div>
		</div>
	);
};
