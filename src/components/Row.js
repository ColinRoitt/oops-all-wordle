import { useSelector } from 'react-redux';
import Cell from './Cell';
import { convertToColors } from '../util';

export default ({ word = '', index = 0 }) => {
  const round = useSelector((state) => state.round);
  const wordToPrint = (() => {
    if (word.length < 5) {
      return word + ' '.repeat(5 - word.length);
    }
    return word;
  })();
  const currentWord = useSelector((state) => state.currentWord);
  const colors = index < round ? convertToColors({ word: currentWord, row: wordToPrint }) : '';

  return (
    <div className="row">
      {wordToPrint.split('').map((letter, pos) => {
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
