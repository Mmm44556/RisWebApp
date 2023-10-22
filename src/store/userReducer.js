
const reducer = (State, action) => {

  switch (action.type) {
    case 'normalInfo':
      const { data } = action;
      console.log("data資料:", data, State)
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