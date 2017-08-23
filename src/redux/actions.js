export const updateSession = update => ({
  type: 'UPDATE_SESSION',
  payload: update,
});

const getBoardUrl = (user, board) => `https://widgets.pinterest.com/v3/pidgets/boards/${user}/${board}/pins/?base_scheme=http`;

export const fetchBoard = ({ user, board }) => dispatch => {
  const key = `board:${user}/${board}`;
  dispatch({ type: 'FETCHING', payload: key });
  fetch(getBoardUrl(user, board))
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: 'FETCH_COMPLETE',
        payload: {
          key,
          pins: response.data.pins,
          feeds: {
            [key]: response.data.pins.map(pin => ({ id: pin.id, type: 'pin' })),
          },
        },
      });
    });
}