
 const reducer = (State, action) => {
  switch (action.type) {
   
    case 'normalInfo':
      return State;
    case 'medicalInfo':
      return State;
    case 'restInfo':
      return State;
    default:
      return State;
  }
}

export { reducer }