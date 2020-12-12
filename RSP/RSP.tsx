import * as React from 'react';
import { useState, useCallback, useRef, useEffect } from 'react';

const rspCoords = {
  rock: '0',
  scissors: '-142px',
  paper: '-284px'
} as const; //값이 바뀔일이 없음, typing이 string이 아닌 그 값 자체로 정해줌

const scores = {
  rock: 0,
  scissors: 1,
  paper: -1,
} as const;

type a = typeof rspCoords; // {rock: '0', scissors: '-142px'...}
type b = keyof typeof rspCoords; // 'rock', 'scissors', 'paper'
type ImgCoords = typeof rspCoords[keyof typeof rspCoords]; // '0', '-142', '-248'

const computerChoice = (imgCoords: ImgCoords) => {
  return (Object.keys(rspCoords) as [keyof typeof rspCoords]).find((k) => {
    return rspCoords[k] === imgCoords;
  })!;
}

const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState<ImgCoords>(rspCoords.rock);
  const [score, setScore] = useState(0);
  const interval = useRef<number>();

  useEffect(() => {
    interval.current = window.setInterval(changeHand, 100);
    return () => {
      console.log('종료');
      clearInterval(interval.current);
    }
  }, [imgCoord]);


  const onClickBtn = (choice: keyof typeof rspCoords) => () => {
    clearInterval(interval.current);
    // clicked.current = true;
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('비겼습니다!');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('졌습니다!');
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = window.setInterval(changeHand, 100);
      // clicked.current = false;
    }, 1000);
  }

  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissors);
    } else if (imgCoord === rspCoords.scissors) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  };

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('scissors')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
}

export default RSP;
