import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import WordRelay from './WordRelay';
import WordRelayClass from './WordRelayClass';

const Hot = hot(WordRelayClass); // react hot loader 적용 HOC, d.ts 제공
ReactDOM.render(<Hot />, document.querySelector('#root'));