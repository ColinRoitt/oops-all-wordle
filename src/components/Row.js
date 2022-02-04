import { useSelector } from "react-redux";
import Cell from "./Cell";

// lol thx https://codegolf.stackexchange.com/questions/241723/highlight-a-wordle-guess
const color = (s) => (g) =>
	g.map(
		(u, i) =>
			s[i] - u && s.some((v, j) => ((g[j] == v) | (u - v) ? 0 : (s[j] = 1)))
	);
const word2arr = (word) => [...word].map((ch) => ch.charCodeAt());
const ret2chr = (ret) =>
	[...ret].map((v) => (v === 0 ? "G" : v === true ? "Y" : " "));

export default ({ word = "", index = 0 }) => {
	const round = useSelector((state) => state.round);
	const wordToPrint = (() => {
		if (word.length < 5) {
			return word + " ".repeat(5 - word.length);
		}
		return word;
	})();
	const currentWord = useSelector((state) => state.currentWord);
	const colors =
		index < round
			? ret2chr(color(word2arr(currentWord))(word2arr(wordToPrint)))
			: "";

	return (
		<div className="row">
			{wordToPrint.split("").map((letter, pos) => {
				return (
					<Cell
						key={`cell-${index}-${pos}`}
						reveal={index < round}
						letter={letter}
						positionIndex={pos}
						row={index}
						color={colors[pos]}
					/>
				);
			})}
		</div>
	);
};
