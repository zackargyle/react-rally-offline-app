export const pins = initialState => (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COMPLETE':
      const { pins } = action.payload;
      if (pins) {
        const pinsById = action.payload.pins.reduce((pins, pin) => ({
          ...pins,
          [pin.id]: pin,
        }), {});
        return {
          ...state,
          ...pinsById,
        };
      }
      return state;
    default:
      return state;
  }
}

export const feeds = initialState => (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COMPLETE':
      if (action.payload.feeds) {
        return {
          ...state,
          ...action.payload.feeds,
        };
      }
      return state;
     default:
      return state;
  }
}

export const api = initialState => (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING':
      return {
        ...state,
        [action.payload]: { fetching: true },
      };
    case 'FETCH_COMPLETE':
      return {
        ...state,
        [action.payload.key]: { fetching: false },
      };
     default:
      return state;
  }
}
