const DEFAULT_STATE = {
  data: [],
  loading: false,
  error: null,
  now: {},
};

export function notesReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case "NOTES/LOADING/SET":
      return { ...state, loading: true, error: null };
    case "NOTES/SET":
      return { ...state, loading: false, error: null, data: action.payload };
    case "NOTES/SET/NOW":
      return { ...state, loading: false, now: action.payload };
    case "NOTES/ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
