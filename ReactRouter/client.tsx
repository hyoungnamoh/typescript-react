import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import ReactRouter from './ReactRouter';

const Hot = hot(ReactRouter);
ReactDOM.render(<Hot />, document.querySelector('#root'));