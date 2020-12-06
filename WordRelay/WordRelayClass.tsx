import * as React from 'react';
import { useState, useCallback, useRef, Component, createRef } from 'react';

interface State {
  word: string,
  value: string,
  result: string,
}
class WordRelayClass extends Component<{}, State> {
  constructor(props: object) {
    super(props);
  }
  state = {
    word: '클래스',
    value: '',
    result: '',
  }
  // inputEl = useRef<HTMLInputElement>(null);
  inputEl = createRef<HTMLInputElement>();

  onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState((prevState) => {
        return {
          result: '딩동댕',
          word: prevState.value,
          value: '',
        }
      });
    } else {
      this.setState({
        result: '땡',
        value: '',
      });
    }
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.currentTarget.value,
    });
  };
  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.inputEl}
            value={this.state.value}
            onChange={(e) => this.onChange(e)}
          />
          <button>입력!</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }

}

export default WordRelayClass;