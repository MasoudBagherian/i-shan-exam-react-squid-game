import { useState } from 'react';
import validate from './validate';
export default function useSquidGame(valitate) {
  const [betCount, setBetCount] = useState(null);
  const [isOdd, setIsOdd] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [playersMarbles, setPlayersMarbles] = useState([10, 10]);
  const [gameStatus, setGameStatus] = useState('IN_PROGRESS');
  const [turn, setTurn] = useState('one');
  return {
    register: inputType => ({
      type: inputType,
      ref: null,
      onChange: e => {
        if (inputType === 'number') {
          if (e.target.value.trim() === '') {
            setSubmitDisable(true);
          } else {
            setSubmitDisable(false);
          }
          setBetCount(+e.target.value);
        }
        if (inputType === 'checkbox') {
          setIsOdd(e.target.checked);
        }
      },
      disabled: isLoading,
    }),
    submit: {
      onClick: e => {
        setIsLoading(true);
        setSubmitDisable(true);
        validate(isOdd, betCount).then(result => {
          setIsLoading(false);
          console.log(`result: ${result}`);
          if (playersMarbles[0] + result < 0) {
            setPlayersMarbles([0, 20]);
            setGameStatus('LOOSE');
          }
          if (playersMarbles[1] - result < 0) {
            setPlayersMarbles([20, 0]);
            setGameStatus('WIN');
          }
          if (turn === 'one') {
            setPlayersMarbles(prev => [prev[0] + result, prev[1] - result]);
            setTurn('two');
          }
          if (turn === 'two') {
            setPlayersMarbles(prev => [prev[0] - result, prev[1] + result]);
            setTurn('one');
          }
        });
      },
      disabled: submitDisable,
    },
    isLoading: isLoading,
    gameStatus: gameStatus,
    history: playersMarbles,
  };
}
