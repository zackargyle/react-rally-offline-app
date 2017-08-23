import React from 'react';
import Pin from './Pin';
import withBoardData from './withBoardData';
import { createSelector } from 'reselect';
import { Box, Masonry } from 'gestalt';

const scrollContainer = () => window;
const selector = createSelector(
  state => state.pins,
  (state, props) => state.feeds[`board:${props.user}/${props.board}`],
  (pins, feed) => feed ? feed.map(({ id }) => pins[id]) : [],
);

const App = ({ feed }) => (
  <Box position="relative" width="100%">
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

export default withBoardData({
  options: props => ({
    user: props.user,
    board: props.board,
  }),
  mapState: (state, props) => {
    return { feed: selector(state, props) };
  },
})(App);
