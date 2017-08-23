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

    componentWillReceiveProps(nextProps) {
      if (!nextProps.inCache) {
        nextProps.dispatch(fetchBoard(config.options(nextProps)));
      }
    }

    render() {
      const { inCache, ...externalProps } = this.props;
      return <Subject {...externalProps} />;
    }
  }

  return connect((state: State, props: Object) => {
    const newProps = {...props, ...config.mapState(state, props) };
    const { user, board } = config.options(newProps);
    const key = `board:${user}/${board}`;
    return {
      ...newProps,
      inCache: Boolean(state.api[key]),
      api: state.api,
    };
  }, dispatch => ({
    dispatch,
    ...config.mapDispatch(dispatch)
  }))(ApiData);
}

export default withBoardData;
