import { Actions, ActionTypes } from './store.actions';
import { State } from "./store.service";
import { Launch } from "./store/models/launch";

export function reducer(state: State, action: Actions): State {
  const result = { ...state };
  switch (action.type) {
    case ActionTypes.initAgencies:
      result.searchValues.agencies = action.payload;

      break;
    case ActionTypes.initStatus:
      result.searchValues.status = action.payload;

      break;
    case ActionTypes.initTypes:
      result.searchValues.types = action.payload;

      break;
    case ActionTypes.initLaunches:
      result.launches = action.payload;

      break;
    case ActionTypes.changeOption:
      result.searchCriteria.option = '';
      result.searchCriteria.value = 0;
      result.filteredLaunches = [];
      result.searchCriteria.option = action.payload;
      result.selectedSearchValues = result.searchValues[action.payload];

      break;
    case ActionTypes.changeValue:
      result.searchCriteria.value = action.payload;
      result.filteredLaunches = filterLaunches(result.searchCriteria.option, result.searchCriteria.value, result.launches);

      break;
    default:
      break;
  }
  return result;
}

function filterLaunches(option: string, value: number, launches: Launch[]): Launch[] {
  if (value != 0) {
    switch (option) {
      case 'agencies':
        return filterByAgency(value, launches);
      case 'types':
        return filterByType(value, launches);
      case 'status':
        return filterByStatus(value, launches);
      default:
        return [];
    }
  }else{
    return [];
  }
}

function filterByAgency(value: number, launches: Launch[]) {
  return launches.filter(launch =>
    launch.location.pads.some( pad =>
      pad.agencies && pad.agencies.some(agency => agency.id == value)
    )
    || launch.rocket.agencies && launch.rocket.agencies.some(agency =>
    agency.id == value
    )
    || launch.missions.some( mission =>
    mission.agencies && mission.agencies.some(agency => agency.id == value)
    )
  )
}

function filterByType(value: number, launches: Launch[]) {
  return launches.filter(launch =>
    launch.missions[0] && launch.missions[0].type == value
    // launch.missions.some( mission => mission.type == value )
  )
}

function filterByStatus(value: number, launches: Launch[]) {
  return launches.filter(launch =>
    launch.status == value
  )
}
