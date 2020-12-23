import * as React from 'react';
import {} from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
// 타입 정해줄 때 자주 쓰이는 친구들 history, location, match, withroute
// npm i react-router, react-router-dom, @types/react-router, @types/react-router-dom
const ReactRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/game/number-baseball">숫자야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto-generator">로또생성기</Link>
        &nbsp;
        <Link to="/game/index">게임 매쳐</Link>
      </div>
      <div>
        <Switch>
          <Route exact path="/" component={GameMatcher} />
          <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default ReactRouter;