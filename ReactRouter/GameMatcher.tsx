import * as React from 'react';
import RSP from '../RSP/RSP';
import Lotto from '../Lotto/LottoClass';
import ResponseCheck from '../ResponseCheck/ResponseCheck';
import GuGuDan from '../GuGuDan/GuGuDan';
import NumberBaseball from '../NumberBaseball/NumberBasball';
import { RouteComponentProps, RouteChildrenProps, withRouter } from 'react-router'; //라우트에서 받은 props 인터페이스는 둘 중 하나 써주면 됨
interface Props extends RouteComponentProps { // 라우트에서 준 props 외 내가 넘겨주는 props이 있을 경우 이렇게 RouteComponentProps를 확장해서 interface 사용
  hello: 'hello'
}
class GameMatcher extends React.Component<RouteComponentProps<{ name: string }>> {
  render() {
    if (!this.props.match) {
      return (
        <div>
          일치하는 게임이 없습니다.
        </div>
      );
    }
    // let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1)); querystring 처리
    // console.log(urlSearchParams.get('page'));
    if (this.props.match.params.name === 'number-baseball') {
      return <NumberBaseball />
    } else if (this.props.match.params.name === 'rock-scissors-paper') {
      return <RSP />
    } else if (this.props.match.params.name === 'lotto-generator') {
      return <Lotto />
    } else {
      return (
        <div>
          일치하는 게임이 없습니다.
        </div>
      );
    }
  }
}

export default withRouter(GameMatcher);