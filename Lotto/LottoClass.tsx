import * as React from 'react';
import { Component } from 'react';
import Ball from './BallClass';

const getWinNumbers = () => {
  const candidate = Array(45).fill(null).map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

interface State {
  winNumbers: number[];
  winBalls: number[];
  bonus: number | null;
  redo: boolean;
}
class LottoClass extends Component<{}, State> {
  state: State = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  }
  timeouts: number[] = [];

  componentDidMount() {
    this.runTimeouts()
  }

  componentDidUpdate(prevProps: object, prevState: State) {
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
    if (prevState.winNumbers !== this.state.winNumbers) {
      console.log('다시 시작');
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  runTimeouts = () => {
    for (let i = 0; i < this.state.winNumbers.length - 1; i++) {
      this.timeouts[i] = window.setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, this.state.winNumbers[i]]
          }
        })
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = window.setTimeout(() => {
      this.setState({
        bonus: this.state.winNumbers[6],
        redo: true,
      });
    }, 7000);
  }

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  }
  render() {
    return (
      <>
        <div>당첨 숫자</div>
        <div id='결과창'>
          {this.state.winBalls.map(v => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        { this.state.bonus && <Ball number={this.state.bonus} />}
        { this.state.redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default LottoClass;