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

export default ({}) => {
	const gameFromLocalStorage = JSON.parse(localStorage.getItem("savedGames"));
	const gamesWon = gameFromLocalStorage.filter((game) => !!game.didWin).length;
	const gamesPlayed = gameFromLocalStorage.length + 1;
	const currentWinStreak = (() => {
		let wonLastGame = true;
		let i = gameFromLocalStorage.length - 1;
		while (wonLastGame) {
			wonLastGame = gameFromLocalStorage[i].didWin;
			i--;
		}
		return gameFromLocalStorage.length - 2 - i;
	})();

	const longestWinStreak =
		(() => {
			let i = 0;
			let j = 0;
			while (i < gameFromLocalStorage.length) {
				if (gameFromLocalStorage[i].didWin) {
					j++;
				} else {
					j = 0;
				}
				i++;
			}
			return j;
		})() + 1;

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

	const copy = () => {
		navigator.clipboard.writeText(clipboardContent);
	};
	const refresh = () => {
		window.location.reload();
	};

	return (
		<div className="stat-screen-cont">
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
				<h2 className="guess-distribution"></h2>
				<p>GRAPH HERE</p>
				<div className="buttons">
					<button className="reset" onClick={refresh}>
						Reset
					</button>
					<button className="copy" onClick={copy}>
						Copy
					</button>
				</div>
			</div>
		</div>
	);
};
