import { combineReducers } from 'redux';
import userReducer from './user';
import postReducer from './post';

const reducer = combineReducers({
  user: userReducer,
  posts: postReducer,
});

export type RootState = ReturnType<typeof reducer>; // typeof reducer가 함수, 이것의 retuen type만 가져오는게 ReturnType, 그리고 얘가 App.tsx에서 mapStateToProps의 인자 state의 타입이 됨

export default reducer;