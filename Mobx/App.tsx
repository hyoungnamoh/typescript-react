import * as React from 'react';
import { Component } from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import { action } from 'mobx';
import { postStore, userStore } from './store';
import { useState, useCallback } from 'react';

interface LocalSotre {
  name: string,
  password: string,
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
const App = () => {
  const state = useLocalStore<LocalSotre>(() => ({ // local state도 mobx에서 관리
    name: '',
    password: '',
    onChangeName: action(function (this: LocalSotre, e: React.ChangeEvent<HTMLInputElement>) {
      this.name = e.target.value;
    }),
    onChangePassword: action(function (this: LocalSotre, e) {
      this.password = e.target.value;
    }),
  }));

  const onLogIn = useCallback(() => {
    userStore.logIn({
      nickname: state.name,
      password: state.password,
    });
  }, [state.name, state.password]);

  const onLogOut = useCallback(() => {
    userStore.logOut();
  }, []);
  return useObserver(() => ( // state가 바뀌면 리렌더링 시켜야하는 컴포넌트
    <div>
      {
        userStore.isLoggingIn
          ? <div>로그인 중</div>
          : userStore.data
            ? <div>{userStore.data.nickname}</div>
            : '로그인 해주세요.'
      }
      {
        !userStore.data
          ? <button onClick={onLogIn}>로그인</button>
          : <button onClick={onLogOut}>로그아웃</button>
      }
      <div>
        <input value={state.name} onChange={state.onChangeName} />
        <input value={state.password} onChange={state.onChangePassword} type={'passord'} />
      </div>
    </div>
  ));
}

export default App;