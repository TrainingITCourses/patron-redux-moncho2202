import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Agency } from "./store/models/agency";
import { MissionType } from "./store/models/mission-type";
import { Status } from "./store/models/status";
import { Launch } from "./store/models/launch";
import { Actions } from "./store.actions";
import { reducer } from "./store.reducer";
import { SearchValues } from "./store/models/search-values";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private state: State = initialState;
  private state$ = new Subject<any>();

  constructor() { }

  public dispatch = (action: Actions) => {
    this.state = reducer(this.state, action);
    this.state$.next(this.getSnapshot());
  };

  public getSnapshot = () => {
    return { ...this.state };
  };

  public select$ = () => this.state$.asObservable();
}

export interface State {
  searchValues: SearchValues,
  launches: Launch[],
  selectedSearchValues: Agency[] | MissionType[] | Status[],
  searchCriteria: { option: string, value: number },
  filteredLaunches: Launch[]
}

export const initialState = {
  searchValues: { agencies: [], types: [], status: [] },
  launches: [],
  selectedSearchValues: [],
  searchCriteria: { option: '', value: 0 },
  filteredLaunches: []
};
