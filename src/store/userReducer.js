
const reducer = (State, action) => {

  switch (action.type) {
    case 'normalInfo':
      const { data } = action;
      return { ...State, normalInfo: data };
    case 'medicalInfo':
      return State;
    case 'restInfo':
      return State;
    default:
      return State;
  }
}

export { reducer }