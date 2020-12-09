import * as React from 'react';
import { useState, useRef, useCallback } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState<number[]>([]);
  const timeout = useRef<number | null>(null); // point useRef가 3개가 있는데 난 useRef.current를 수정해야함, 따라서 3개 중 current가 readonly가 아닌애를 찾아 그 애 처럼 짝을 맞춰줌, 기존대로 useRef<number>(null) 요렇게 사용하면 current가 readonly인 애를 가져옴
  const startTime = useRef(0);
  const endTime = useRef(0);

  const onClickScreen = useCallback(() => {
    if (state === 'waiting') {
      timeout.current = window.setTimeout(() => { // 그냥 setTimeout 쓰면 node.setTimeout 인지 window.setTimeout인지 얘가 헷갊려 핳 때가 종종있음
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date().getTime();
      }, Math.floor(Math.random() * 1000) + 2000);
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
    } else if (state === 'ready') {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
    } else if (state === 'now') {
      endTime.current = new Date().getTime();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  }, [state, message result]);

  const onReset = useCallback(() => {
    setResult([]);
  }, []);

  const renderAverage = () => {
    return result.length === 0 ?
      null :
      <>
        <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
  }

  return (
    <>
      <div
        id='screen'
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {renderAverage()}
    </>
  );
}

export default ResponseCheck;