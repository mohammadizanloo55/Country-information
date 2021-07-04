const ToggleLoading = (Action) => {
  return {
    IsLoaded: Action.payload.IsLoaded,
  };
};
const LoadingReducer = (State, Action) => {
  switch (Action.type) {
    case "ToggleLoading": {
      return ToggleLoading(Action);
    }
    default: {
      console.error("You are not set the type for Action");
    }
  }
};

export default LoadingReducer;
