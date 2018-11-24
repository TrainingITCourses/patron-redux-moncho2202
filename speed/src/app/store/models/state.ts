import { Launch } from "./launch";
import { Agency } from "./agency";
import { MissionType } from "./mission-type";
import { Status } from "./status";
import { SearchCriteria } from "./search-criteria";

export interface State {
  launches: Launch[],
  agencies: Agency[],
  missionTypes: MissionType[],
  status: Status[],
  searchCriteria: SearchCriteria,
}

export const initialState: State = {
  launches: [],
  agencies: [],
  missionTypes: [],
  status: [],
  searchCriteria: { option: '', value: 0 }
};