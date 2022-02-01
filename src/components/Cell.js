import { useDispatch, useSelector } from "react-redux";

export default ({ letter = "", positionIndex = -1, reveal = true }) => {
	const currentWord = useSelector((state) => state.currentWord);
	const isCurrentLetterUsed = currentWord.includes(letter);
	const isInCorrectPosition = letter === currentWord[positionIndex];

	const color = (() => {
		if (isInCorrectPosition && reveal) {
			return "correct";
		}
		if (isCurrentLetterUsed && reveal) {
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
