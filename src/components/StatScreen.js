import { useDispatch, useSelector } from "react-redux";

// lol thx https://codegolf.stackexchange.com/questions/241723/highlight-a-wordle-guess
const color = (s) => (g) =>
	g.map(
		(u, i) =>
			s[i] - u && s.some((v, j) => ((g[j] == v) | (u - v) ? 0 : (s[j] = 1)))
	);
const word2arr = (word) => [...word].map((ch) => ch.charCodeAt());
const ret2chr = (ret) =>
	[...ret].map((v) => (v === 0 ? "G" : v === true ? "Y" : " "));

const blank = "⬛";
const green = "🟩";
const yellow = "🟨";

export default ({ setStatScreen }) => {
	const gameFromLocalStorage = JSON.parse(localStorage.getItem("savedGames"));
	// console.log(gameFromLocalStorage);
	const gamesWon = gameFromLocalStorage.filter((game) => !!game.didWin).length;
	const gamesPlayed = gameFromLocalStorage.length;
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

	// const longestWinStreak =
	// 	(() => {
	// 		let i = 0;
	// 		let j = 0;
	// 		while (i < gameFromLocalStorage.length) {
	// 			if (gameFromLocalStorage[i].didWin) {
	// 				j++;
	// 			} else {
	// 				j = 0;
	// 			}
	// 			i++;
	// 		}
	// 		return j;
	// 	})() + 1;

	// const dispatch = useDispatch();
	const currentWord = useSelector((state) => state.currentWord);
	const round = useSelector((state) => state.round);
	const grid = useSelector((state) => state.grid).slice(0, round);
	const colors = grid.map((row, index) =>
		ret2chr(color(word2arr(currentWord))(word2arr(row)))
	);

	const clipboardContent = colors
		.map((row, index) =>
			row.reduce(
				(acc, char) =>
					(acc += char === "Y" ? yellow : char === "G" ? green : blank),
				""
			)
		)
		.join("\n");

	const copy = (e) => {
		e.stopPropagation();
		navigator.clipboard.writeText(clipboardContent);
	};
	const refresh = () => {
		window.location.reload();
	};

	const oneValue =
		(gameFromLocalStorage.filter((game) => game.rounds === 1).length /
			gamesPlayed) *
		100;

	const twoValue =
		(gameFromLocalStorage.filter((game) => game.rounds === 2).length /
			gamesPlayed) *
		100;

	const threeValue =
		(gameFromLocalStorage.filter((game) => game.rounds === 3).length /
			gamesPlayed) *
		100;

	const fourValue =
		(gameFromLocalStorage.filter((game) => game.rounds === 4).length /
			gamesPlayed) *
		100;
	const fiveValue =
		(gameFromLocalStorage.filter((game) => game.rounds === 5).length /
			gamesPlayed) *
		100;
	const sixValue =
		(gameFromLocalStorage.filter((game) => game.rounds === 6).length /
			gamesPlayed) *
		100;

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
					{/* <div className="value">
						<span className="num">{longestWinStreak}</span>
						<span className="label">max streak</span>
					</div> */}
				</div>
				<h2 className="guess-distribution">GUESS DISTRIBUTION</h2>
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
						<div className="one bar" style={{ width: oneValue + "%" }}>
							<span className="val">
								{gameFromLocalStorage.filter((game) => game.rounds === 1)
									.length || "-"}
							</span>
						</div>
						<div className="two bar" style={{ width: twoValue + "%" }}>
							<span className="val">
								{gameFromLocalStorage.filter((game) => game.rounds === 2)
									.length || "-"}
							</span>
						</div>
						<div className="three bar" style={{ width: threeValue + "%" }}>
							<span className="val">
								{gameFromLocalStorage.filter((game) => game.rounds === 3)
									.length || "-"}
							</span>
						</div>
						<div className="four bar" style={{ width: fourValue + "%" }}>
							<span className="val">
								{gameFromLocalStorage.filter((game) => game.rounds === 4)
									.length || "-"}
							</span>
						</div>
						<div className="five bar" style={{ width: fiveValue + "%" }}>
							<span className="val">
								{gameFromLocalStorage.filter((game) => game.rounds === 5)
									.length || "-"}
							</span>
						</div>
						<div className="six bar" style={{ width: sixValue + "%" }}>
							<span className="val">
								{gameFromLocalStorage.filter((game) => game.rounds === 6)
									.length || "-"}
							</span>
						</div>
					</div>
				</div>
				<div className="buttons">
					<button className="reset" onClick={refresh}>
						Play Again
					</button>
					<button className="copy" onClick={copy}>
						Copy Grid
					</button>
				</div>
			</div>
		</div>
	);
};
