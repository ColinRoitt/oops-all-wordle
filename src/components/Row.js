import { useSelector } from "react-redux";
import Cell from "./Cell";

export default ({ word = "", index = 0 }) => {
	const round = useSelector((state) => state.round);
	const wordToPrint = (() => {
		if (word.length < 5) {
			return word + " ".repeat(5 - word.length);
		}
		return word;
	})();

	return (
		<div className="row">
			{wordToPrint.split("").map((letter, pos) => {
				return (
					<Cell
						key={`cell-${index}-${pos}`}
						reveal={index < round}
						letter={letter}
						positionIndex={pos}
					/>
				);
			})}
		</div>
	);
};
