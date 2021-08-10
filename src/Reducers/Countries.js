const SetNewData = (State, Action) => {
  const PrevState = { ...State };

  const { IsDefault, FakeUpdate, NewData, Page, ModeKey, QueryKey } =
    Action.payload;
  if (FakeUpdate) {
    PrevState.FakeUpdate = FakeUpdate;
  }
  PrevState.Mode = ModeKey;

  if (IsDefault) {
    PrevState[ModeKey] = {
      ...PrevState[ModeKey],
      ...(Page ? { Page } : {}),
      Data: NewData.data,
      PageLength: NewData.PageLength,
    };

    return PrevState;
  }

  PrevState.QueryKey = QueryKey;

  PrevState[ModeKey][QueryKey] = {
    Data: NewData.data,
    PageLength: NewData.PageLength,
    Page: 2,
  };

  return PrevState;
};
const MergeNewData = (State, Action) => {
  const PrevState = { ...State };

  const { IsDefault, NewData, ModeKey, QueryKey } = Action.payload;
  if (IsDefault) {
    PrevState[ModeKey].Data = [...PrevState[ModeKey].Data, ...NewData.data];

    ++PrevState[ModeKey].Page;

    return PrevState;
  }

  PrevState[ModeKey][QueryKey].Data = [
    ...PrevState[ModeKey][QueryKey].Data,
    ...NewData.data,
  ];

  ++PrevState[ModeKey][QueryKey].Page;

  return PrevState;
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
