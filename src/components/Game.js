import { useDispatch, useSelector } from "react-redux";
import Row from "./Row";

export default ({}) => {
	const grid = useSelector((state) => state.grid);
	const round = useSelector((state) => state.round);
	const dispatch = useDispatch();
	const type = (letter) => {
		if (grid[round].length < 5) {
			const newGrid = [...grid];
			newGrid[round] += letter;
			dispatch({ type: "SET_GRID", payload: newGrid });
		}
	};
	const enter = () => {
		if (grid[round].length === 5) {
			const newGrid = [...grid];
			dispatch({ type: "SET_GRID", payload: newGrid });
			dispatch({ type: "SET_ROUND", payload: round + 1 });
		}
	};
	const backspace = () => {
		if (grid[round].length > 0) {
			const newGrid = [...grid];
			newGrid[round] = newGrid[round].slice(0, -1);
			dispatch({ type: "SET_GRID", payload: newGrid });
		}
	};

	return (
		<div className="game">
			<div className="grid">
				{grid.map((word, index) => {
					return <Row key={`row-${index}`} word={word} index={index} />;
				})}
			</div>
			<div className="keyboard">
				<div className="keyboard-row">
					<div className="keyboard-key" onClick={() => type("Q")}>
						Q
					</div>
					<div className="keyboard-key" onClick={() => type("W")}>
						W
					</div>
					<div className="keyboard-key" onClick={() => type("E")}>
						E
					</div>
					<div className="keyboard-key" onClick={() => type("R")}>
						R
					</div>
					<div className="keyboard-key" onClick={() => type("T")}>
						T
					</div>
					<div className="keyboard-key" onClick={() => type("Y")}>
						Y
					</div>
					<div className="keyboard-key" onClick={() => type("U")}>
						U
					</div>
					<div className="keyboard-key" onClick={() => type("I")}>
						I
					</div>
					<div className="keyboard-key" onClick={() => type("O")}>
						O
					</div>
					<div className="keyboard-key" onClick={() => type("P")}>
						P
					</div>
				</div>
				<div className="keyboard-row">
					<div className="keyboard-key" onClick={() => type("A")}>
						A
					</div>
					<div className="keyboard-key" onClick={() => type("S")}>
						S
					</div>
					<div className="keyboard-key" onClick={() => type("D")}>
						D
					</div>
					<div className="keyboard-key" onClick={() => type("F")}>
						F
					</div>
					<div className="keyboard-key" onClick={() => type("G")}>
						G
					</div>
					<div className="keyboard-key" onClick={() => type("H")}>
						H
					</div>
					<div className="keyboard-key" onClick={() => type("J")}>
						J
					</div>
					<div className="keyboard-key" onClick={() => type("K")}>
						K
					</div>
					<div className="keyboard-key" onClick={() => type("L")}>
						L
					</div>
				</div>
				<div className="keyboard-row">
					<div className="keyboard-key double-height" onClick={enter}>
						ENTER
					</div>
					<div className="keyboard-key" onClick={() => type("Z")}>
						Z
					</div>
					<div className="keyboard-key" onClick={() => type("X")}>
						X
					</div>
					<div className="keyboard-key" onClick={() => type("C")}>
						C
					</div>
					<div className="keyboard-key" onClick={() => type("V")}>
						V
					</div>
					<div className="keyboard-key" onClick={() => type("B")}>
						B
					</div>
					<div className="keyboard-key" onClick={() => type("N")}>
						N
					</div>
					<div className="keyboard-key" onClick={() => type("M")}>
						M
					</div>
					<div className="keyboard-key double-height" onClick={backspace}>
						BACK
					</div>
				</div>
			</div>
		</div>
	);
};
