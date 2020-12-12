import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';

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

interface State {
  result: string,
  imgCoord: ImgCoords,
  score: number,
}

class RSPClass extends Component<{}, State> {
  state: State = {
    result: '',
    imgCoord: '0',
    score: 0,
  }
  interval: number | null = null;

  componentDidMount = () => {
    this.interval = window.setInterval(this.changeHand, 100);
  }

  componentDidUpdate = (prevProps: object, prevState: State) => {
    if (prevState.imgCoord !== this.state.imgCoord) {
      this.interval = window.setInterval(this.changeHand, 100);
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.interval!);
    console.log('종료');
  }

  onClickBtn = (choice: keyof typeof rspCoords) => (e: HTMLButtonElement) => {
    clearInterval(this.interval!);
    // clicked.current = true;
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(this.state.imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: '비겼습니다!',
      })
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다!',
          score: prevState.score + 1,
        }
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다!',
          score: prevState.score - 1,
        }
      });
    }
    setTimeout(() => {
      this.interval = window.setInterval(this.changeHand, 100);
      // clicked.current = false;
    }, 1000);
  }

  changeHand = () => {
    if (this.state.imgCoord === rspCoords.rock) {
      this.setState({
        imgCoord: rspCoords.scissors,
      });
    } else if (this.state.imgCoord === rspCoords.scissors) {
      this.setState({
        imgCoord: rspCoords.paper,
      });
    } else if (this.state.imgCoord === rspCoords.paper) {
      this.setState({
        imgCoord: rspCoords.rock,
      });
    }
  };

  render() {
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.state.imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('scissors')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>보</button>
        </div>
        <div>{this.state.result}</div>
        <div>현재 {this.state.score}점</div>
      </>
    );
  }
}


export default RSPClass;
