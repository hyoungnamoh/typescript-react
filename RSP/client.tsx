import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import RSPClass from './RSPClass';

const Hot = hot(RSPClass);
ReactDOM.render(<Hot />, document.querySelector('#root'));