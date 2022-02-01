import Cell from "./Cell";

export default ({ word = "" }) => {
	const wordToPrint = (() => {
		if (word.length < 5) {
			return word + " ".repeat(5 - word.length);
		}
		return word;
	})();

	return (
		<div className="row">
			{wordToPrint.split("").map((letter, index) => {
				return <Cell letter={letter} positionIndex={index} />;
			})}
		</div>
	);
};
