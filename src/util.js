// lol thx https://codegolf.stackexchange.com/questions/241723/highlight-a-wordle-guess
export const color = (s) => (g) =>
  g.map((u, i) => s[i] - u && s.some((v, j) => ((g[j] == v) | (u - v) ? 0 : (s[j] = 1))));
export const word2arr = (word) => [...word].map((ch) => ch.charCodeAt());

export const ret2chr = (ret) => [...ret].map((v) => (v === 0 ? 'G' : v === true ? 'Y' : ' '));

export const convertToColors = ({ word, row }) => ret2chr(color(word2arr(word))(word2arr(row)));

export const blank = '⬛';
export const green = '🟩';
export const yellow = '🟨';

// game schema
// {
// 	didWin: true || false,
// 	rounds: 1-6,
// 	grid: [],
// }
export const saveGame = (game) => {
  const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
  const newSavedGames = [...savedGames, game];
  localStorage.setItem('savedGames', JSON.stringify(newSavedGames));
};

export const encodeWord = (word) =>
  word
    .split('')
    .map((chr, index) => chr.charCodeAt(0) * 8 + index * 3)
    .join('-');

export const decodeWord = (word) =>
  word
    .split('-')
    .map((chr, index) => String.fromCharCode((chr - index * 3) / 8))
    .join('');
