import { Actions, ActionTypes } from './store.actions';
import { State } from "./store/models/state";


export function reducer(state: State, action: Actions): State {
  const result = { ...state };
  switch (action.type) {
    case ActionTypes.LoadAgencies:
      result.agencies = action.payload;

      break;
    case ActionTypes.LoadStatus:
      result.status = action.payload;

      break;
    case ActionTypes.LoadTypes:
      result.missionTypes = action.payload;

      break;
    case ActionTypes.LoadLaunches:
      result.launches = action.payload;

      break;
    case ActionTypes.ChangeOption:
      result.searchCriteria.option = action.payload;
      result.searchCriteria.value = 0;

      break;
    case ActionTypes.ChangeValue:
      result.searchCriteria.value = action.payload;

      break;
    default:
      break;
  }
  return result;
}

