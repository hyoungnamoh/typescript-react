import * as React from 'react';
import { Component, createRef } from 'react';

interface State {
  state: 'waiting' | 'now' | 'ready';
  message: string;
  result: number[];
}

class ResponseCheckClass extends Component<{}, State> {
  // 클래스에서 제공하는 최산 문법 class property 문법
  // class property 문법 사용 시 Component 두번째 인자로 interface 넣어도 적용이 안됨, 직접 state에 걸던가 as 사용해야함 (this.state 정식으로 하면 적용 됨)
  // 유니온이나 빈배열 있는 경우 타입추론 안 됨
  state: State = {
    state: 'waiting',
    message: '클릭해서 시작하세요',
    result: [],
  };
  timeout: number | null = null;
  startTime: number | null = null;
  endTime: number | null = null;

  onReset = () => {
    this.setState({
      result: [],
    });
  }

  renderAverage = () => {
    return this.state.result.length === 0 ?
      null :
      <>
        <div>평균시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
  }

  onClickScreen = () => {
    const { state } = this.state;
    if (state === 'waiting') {
      this.timeout = window.setTimeout(() => { // 그냥 setTimeout 쓰면 node.setTimeout 인지 window.setTimeout인지 얘가 헷갊려 핳 때가 종종있음
        this.setState({
          state: 'now',
          message: '지금 클릭',
        });
        this.startTime = new Date().getTime();
      }, Math.floor(Math.random() * 1000) + 2000);
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.',
      });
    } else if (state === 'ready') {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
      })
    } else if (state === 'now') {
      this.endTime = new Date().getTime();
      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요.',
          result: [...prevState.result, this.endTime! - this.startTime!]
        }
      });
    }
  }

  render() {
    return (
      <>
        <div
          id='screen'
          className={this.state.state}
          onClick={this.onClickScreen}
        >
          {this.state.message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheckClass;