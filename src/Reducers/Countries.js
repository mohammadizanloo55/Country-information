const SetNewData = ({ payload }) => {
  return {
    ...payload.Data,
  };
};
const CountriesReducer = (State, Action) => {
  switch (Action.type) {
    case "SetNewData": {
      return SetNewData(Action);
    }
    default: {
      console.error("You are not set the type for Action");
    }
  }
};
export default CountriesReducer;
