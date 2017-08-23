import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBoard } from './redux/actions';

const withBoardData = config => Subject => {
  class ApiData extends Component {
    static displayName = `withBoardData()`;

    componentDidMount() {
      if (!this.props.inCache) {
        this.props.dispatch(fetchBoard(config.options(this.props)));
      }
    }

    render() {
      const { inCache, ...externalProps } = this.props;
      return <Subject {...externalProps} />;
    }
  }

  return connect((state: State, props: Object) => {
    const { user, board } = config.options(props);
    const key = `board:${user}/${board}`;
    return {
      ...(config.mapState ? config.mapState(state, props) : {}),
      inCache: Boolean(state.api[key]),
      api: state.api,
    };
  })(ApiData);
}

export default withBoardData;
