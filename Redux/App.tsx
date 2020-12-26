import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { logIn, logOut } from './actions/user';
import { RootState } from './reducers';
import { UserState } from './reducers/user';

interface StateToProps {
  user: UserState, //mapStateProps
}

interface DispatchToProps {
  dispatchLogIn: ({ id, password }: { id: string, password: string }) => void, //mapDispatchToProps
  dispatchLogOut: () => void,//mapDispatchToProps
}
class App extends Component<StateToProps & DispatchToProps> {
  onClick = () => {
    this.props.dispatchLogIn({
      id: 'hyoungnam',
      password: '1234',
    });
  }
  onLogOut = () => {
    this.props.dispatchLogOut();
  }
  render() {
    return (
      <div>
        {isLoggingIn
          ? <div>로그인 중</div>
          : data
            ? <div>{data.nickname}</div>
            : '로그인 해주세요.'}
        {!data
          ? <button onClick={onClick}>로그인</button>
          : <button onClick={onLogout}>로그아웃</button>}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({ //redux state -> combinereducer
  user: state.user,
  // posts: state.posts,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({ //redux의 dispatch interface
  dispatchLogIn: (data: { id: string, password: string }) => dispatch(logIn(data)),
  dispatchLogOut: () => dispatch(logOut()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
