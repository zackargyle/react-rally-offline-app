import React, { PureComponent } from 'react';
import Pin from './Pin';
import withBoardData from './withBoardData';
import { createSelector } from 'reselect';
import { updateSession } from './redux/actions';
import { Box, Button, Label, Masonry, Text, TextField } from 'gestalt';

const scrollContainer = () => window;
const selector = createSelector(
  state => state.pins,
  ({ feeds, session }) => feeds[`board:${session.user}/${session.board}`],
  (pins, feed) => feed ? feed.map(({ id }) => pins[id]) : [],
);

class App extends PureComponent {

  state = {
    board: this.props.board,
    user: this.props.user,
  };

  componentWillReceiveProps(nextProps) {
    const { user, board } = nextProps;
    if (board !== this.props.board || user !== this.props.user) {
      this.setState({ user, board });
    }
  }

  updateBoard = (board) => this.setState({ board });
  updateUser = (user) => this.setState({ user });

  updateQuery = (event) => {
    event.preventDefault();

    const { board, user } = this.state;
    this.props.updateSession({ user, board });
    window.history.replaceState({}, '', `/?user=${user}&board=${board}`);
  }

  render() {
    const { feed } = this.props;
    const { board, user } = this.state;
    return (
      <Box position="relative" width="100%">
        <Box display="inlineBlock" _padding={4} column={9} maxWidth={500}>
          <form onSubmit={this.updateQuery}>
            <Box _paddingY={2}>
              <Box column={3} display="inlineBlock">
                <Label htmlFor="board">
                  <Text inline>Board</Text>
                </Label>
              </Box>
              <Box column={9} display="inlineBlock">
                <TextField id="board" value={board} onChange={this.updateBoard} />
              </Box>
            </Box>
            <Box _paddingY={2}>
              <Box column={3} display="inlineBlock">
                <Label htmlFor="user">
                  <Text inline>Username</Text>
                </Label>
              </Box>
              <Box column={9} display="inlineBlock">
                <TextField id="user" value={user} onChange={this.updateUser} />
              </Box>
            </Box>
            <Box _paddingY={2}>
              <Button type="submit" color="red" text="Submit" />
            </Box>
          </form>
        </Box>
        <Masonry
          columnWidth={237}
          comp={Pin}
          flexible
          items={feed}
          minCols={2}
          scrollContainer={scrollContainer}
          serverRender
          virtualize
        />
      </Box>
    );
  }
}

export default withBoardData({
  options: props => ({
    user: props.user,
    board: props.board,
  }),
  mapState: (state, props) => {
    return {
      feed: selector(state, props),
      user: state.session.user,
      board: state.session.board,
    };
  },
  mapDispatch: (dispatch) => ({
    updateSession: update => dispatch(updateSession(update)),
  }),
})(App);
