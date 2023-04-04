import { useState } from 'react';
import './App.css';
import generateRandomNumber from './random';
import { useEffect } from 'react';

function App() {
  const [randomNumber, setRandomNumber] = useState([]);
  const [answer, setAnswer] = useState('');
  const [logs, setLogs] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setRandomNumber(generateRandomNumber());
  }, []);

  const handleAnswerChange = (e) => {
    const value = e.target.value;

    setAnswer(value);
  };

  const handleRetry = () => {
    setRandomNumber(generateRandomNumber());
    setAnswer('');
    setLogs([]);
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (success) {
      handleRetry();
      return;
    }

    const answerArray = answer.split('').map((value) => Number(value));

    if (answerArray.some((number) => isNaN(number))) {
      alert('숫자만 입력해주세요.');
      return;
    }

    if (answerArray.length !== 4) {
      alert('네 자리 숫자만 입력해주세요.');
      return;
    }

    if (answerArray.some((number) => number === 0)) {
      alert('0 이외의 숫자만 입력해주세요.');
      return;
    }

    const isDuplicate = answerArray.some(
      (number, index) => answerArray.indexOf(number) !== index,
    );

    if (isDuplicate) {
      alert('입력 값에 중복이 있어요.');
      return;
    }

    const { ball, strike } = randomNumber.reduce(
      (acc, cur, idx) => {
        if (cur === answerArray[idx]) {
          return {
            ...acc,
            strike: acc.strike + 1,
          };
        }

        if (answerArray.includes(cur)) {
          return {
            ...acc,
            ball: acc.ball + 1,
          };
        }

        return acc;
      },
      {
        ball: 0,
        strike: 0,
      },
    );

    const isCorrect = strike === 4;

    if (isCorrect) {
      alert('정답입니다!');
      setLogs([...logs, `${answer} (축하합니다, 정답입니다.)`]);
      setSuccess(true);
      return;
    }

    setLogs([...logs, `${answer} (strike: ${strike}, ball: ${ball})`]);
  };

  return (
    <div className="App">
      <h1>숫자 야구 게임</h1>
      <header>{success ? answer : '----'}</header>
      <form onSubmit={handleSubmit}>
        <input type="text" value={answer} onChange={handleAnswerChange} />
        {success ? (
          <input type="submit" value="다시하기" />
        ) : (
          <input type="submit" value="맞춰보기" />
        )}
      </form>
      <h2>기록</h2>
      <ol>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
