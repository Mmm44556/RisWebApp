
export const reducer = (State, action) => {
  switch (action.type) {
    case 'LoggedIn':
      return { isLogging: !State.isLogging };

    default:
      return State;
  }
}