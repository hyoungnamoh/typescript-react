import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import LottoClass from './LottoClass';

const Hot = hot(LottoClass);
ReactDOM.render(<Hot />, document.querySelector('#root'));