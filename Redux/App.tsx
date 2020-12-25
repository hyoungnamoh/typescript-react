import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {logIn, logOut} from './actions/user';


class App extends Component {
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

const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLogIn: (data: {id, password}) => dispatch(logIn(data)),
  dispatchLogOut: () => dispatch(logOut());
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
