import { useDispatch, useSelector } from "react-redux";
import { convertToColors, blank, green, yellow, encodeWord } from "../util";

export default ({ setStatScreen }) => {
	const gameIsOver = useSelector((state) => state.gameIsOver);
	const gameFromLocalStorage = JSON.parse(localStorage.getItem("savedGames"));
	const lastGame = gameFromLocalStorage[gameFromLocalStorage.length - 1];
	const gamesWon = gameFromLocalStorage.filter((game) => !!game.didWin).length;
	const gamesPlayed = gameFromLocalStorage.length;
	const currentWord = useSelector((state) => state.currentWord);
	const round = useSelector((state) => state.round);
	const grid = useSelector((state) => state.grid).slice(0, round);

	const currentWinStreak = (() => {
		if (gameFromLocalStorage.length === 0) return 0;
		let wonLastGame = true;
		let i = gameFromLocalStorage.length - 1;
		while (wonLastGame) {
			wonLastGame = !!gameFromLocalStorage[i]?.didWin;
			i--;
		}
		return gameFromLocalStorage.length - 2 - i;
	})();

	const colors = grid.map((row, index) =>
		convertToColors({ word: currentWord, row })
	);

	const barValues = [1, 2, 3, 4, 5, 6].map(
		(value) =>
			(gameFromLocalStorage.filter((game) => game.rounds === value).length /
				gamesPlayed) *
			100
	);

	const clipboardContent = (showWord) =>
		[
			`Wordsle - ${showWord ? currentWord.toLowerCase() : ""} ${
				lastGame?.didWin ? round : "X"
			}/6`,
			...colors.map((row, index) =>
				row.reduce(
					(acc, char) =>
						(acc += char === "Y" ? yellow : char === "G" ? green : blank),
					""
				)
			),
		].join("\n");

	const copy = (e) => {
		e.stopPropagation();
		if (gameIsOver) navigator.clipboard.writeText(clipboardContent(true));
	};
	const refresh = () => {
		window.location = window.location.pathname;
	};
	const copyLink = (e) => {
		e.stopPropagation();
		navigator.clipboard.writeText(
			clipboardContent(false) +
				"\n" +
				window.location.origin +
				"/collection-of-wordsle?pz=" +
				encodeWord(currentWord)
		);
	};

	return (
		<div className="stat-screen-cont" onClick={() => setStatScreen(false)}>
			<div className="stat-screen">
				<h1>statistics</h1>
				<div className="numbers">
					<span className="value">
						<span className="num">{gamesWon}</span>
						<span className="label">played</span>
					</span>
					<span className="value">
						<span className="num">
							{Math.round((gamesWon / gamesPlayed) * 100)}
						</span>
						<span className="label">won %</span>
					</span>
					<div className="value">
						<span className="num">{currentWinStreak}</span>
						<span className="label">streak</span>
					</div>
				</div>
				<h1 className="guess-distribution">GUESS DISTRIBUTION</h1>
				<div className="graph">
					<div className="labels">
						<span className="num">1</span>
						<span className="num">2</span>
						<span className="num">3</span>
						<span className="num">4</span>
						<span className="num">5</span>
						<span className="num">6</span>
					</div>
					<div className="bars">
						{["one", "two", "three", "four", "five", "six"].map(
							(number, index) => (
								<div
									className={`${number} bar`}
									style={{ width: barValues[index] + "%" }}
								>
									<span className="val">
										{gameFromLocalStorage.filter(
											(game) => game.rounds === index + 1
										).length || "-"}
									</span>
								</div>
							)
						)}
					</div>
				</div>
				<div className="buttons">
					<button className="reset" onClick={refresh}>
						New Game
					</button>
					<button
						className={`copy ${gameIsOver ? "" : "disabled"}`}
						disabled={!gameIsOver}
						onClick={copy}
					>
						Copy Grid
					</button>
					<button
						className={`copy-link ${gameIsOver ? "" : "disabled"}`}
						disabled={!gameIsOver}
						onClick={copyLink}
					>
						Copy Link to this Puzzle
					</button>
				</div>
			</div>
		</div>
	);
};
