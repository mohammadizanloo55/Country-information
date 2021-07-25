const SetNewData = (State, { payload }) => {
  return {
    ...State,
    ...payload.Data,
  };
};
const MergeNewData = (State, Action) => {
  return {
    ...State,
    data: [...State.data, ...Action.payload.Data],
  };
};
const CountriesReducer = (State, Action) => {
  switch (Action.type) {
    case "SetNewData": {
      return SetNewData(State, Action);
    }
    case "MergeNewData": {
      return MergeNewData(State, Action);
    }
    default: {
      console.error("You are not set the type for Action");
    }
  }
};
export default CountriesReducer;
