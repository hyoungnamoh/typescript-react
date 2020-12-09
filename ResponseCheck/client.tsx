import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import ResponseCheck from './ResponseCheck';
import ResponseCheckClass from './ResponseCheckClass';

const Hot = hot(ResponseCheckClass);
ReactDOM.render(<Hot />, document.querySelector('#root'));