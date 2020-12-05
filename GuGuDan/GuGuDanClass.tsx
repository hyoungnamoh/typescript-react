import * as React from 'react';
import { Component, FormEvent, ChangeEvent } from 'react';

interface State {
  first: number,
  second: number,
  value: string,
  result: string,
}

class GuGuDanClass extends Component<{}, State> { // Component Generic<props, state>
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: '',
    result: '',
  }

  onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value, first, second } = this.state;
    if (parseInt(value) === first * second) {
      this.setState((prevState) => {
        return {
          result: '정답' + prevState.value,
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: '',
        }
      });
      if (this.input) {
        this.input.focus();
      }
    } else {
      this.setState({
        result: '땡',
        value: '',
      });
      if (this.input) {
        this.input.focus();
      }
    }
  };

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  }

  input: HTMLInputElement | null = null;

  onRefInput = (ref: HTMLInputElement) => { this.input = ref }

  render() {
    const { value, first, second, result } = this.state;
    return (
      <>
        <div>{first} 곱하기mm {second}는?</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.onRefInput}
            type="number"
            value={value}
            onChange={(e) => this.onChange(e)}
          />
          <button>입력!!!</button>
        </form>
        <div id="result">{result}</div>
      </>
    )
  }
}
export default GuGuDanClass;