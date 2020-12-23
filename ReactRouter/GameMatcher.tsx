import * as React from 'react';
import Numberbaseball from '../NumberBaseball/NumberBasball';
import RSP from '../RSP/RSP';
import Lotto from '../Lotto/Lotto';
import ResponseCheck from '../ResponseCheck/ResponseCheck';
import GuGuDan from '../GuGuDan/GuGuDan';
class GameMatcher extends Component {
  render() {
    if (!this.props.match) {
        return (
            <div>
                일치하는 게임이 없습니다.
            </div>
        );
    }
    // let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
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