import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { initialState, State } from "./store/models/state";
import { reducer } from "./store.reducer";
import { Agency } from "./store/models/agency";
import { MissionType } from "./store/models/mission-type";
import { Status } from "./store/models/status";
import { Launch } from "./store/models/launch";
import { Actions, ActionTypes } from "./store.actions";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private state: State = initialState;
  private launches$ = new BehaviorSubject<Launch[]>(this.state.launches);
  private agencies$ = new BehaviorSubject<Agency[]>(this.state.agencies);
  private missionTypes$ = new BehaviorSubject<MissionType[]>(this.state.missionTypes);
  private status$ = new BehaviorSubject<Status[]>(this.state.status);
  private option$ = new BehaviorSubject<string>(this.state.searchCriteria.option);
  private value$ = new BehaviorSubject<number>(this.state.searchCriteria.value);

  constructor() { }

  public dispatch = (action: Actions) => {
    this.state = reducer(this.state, action);
    switch (action.type) {
      case ActionTypes.LoadLaunches:
        this.launches$.next([...this.state.launches]);
        break;
      case ActionTypes.LoadAgencies:
        this.agencies$.next([...this.state.agencies]);
        break;
      case ActionTypes.LoadTypes:
        this.missionTypes$.next([...this.state.missionTypes]);
        break;
      case ActionTypes.LoadStatus:
        this.status$.next([...this.state.status]);
        break;
      case ActionTypes.ChangeOption:
        this.option$.next(this.state.searchCriteria.option);
        break;
      case ActionTypes.ChangeValue:
        this.value$.next(this.state.searchCriteria.value);
        break;
    }
  };

  public selectSnapShot = (slice: SlideTypes): any => {
    switch (slice) {
      case SlideTypes.launches:
        return [...this.state.launches];
      case SlideTypes.agencies:
        return [...this.state.agencies];
      case SlideTypes.types:
        return [...this.state.missionTypes];
      case SlideTypes.status:
        return [...this.state.status];
      case SlideTypes.option:
        return this.state.searchCriteria.option;
      case SlideTypes.value:
        return this.state.searchCriteria.value;
    }
  };

  public select$ = (slice: SlideTypes): Observable<any> => {
    switch (slice) {
      case SlideTypes.launches:
        return this.launches$.asObservable();
      case SlideTypes.agencies:
        return this.agencies$.asObservable();
      case SlideTypes.types:
        return this.missionTypes$.asObservable();
      case SlideTypes.status:
        return this.status$.asObservable();
      case SlideTypes.option:
        return this.option$.asObservable();
      case SlideTypes.value:
        return this.value$.asObservable();
    }
  };
}

export enum SlideTypes {
  launches = 'launches',
  agencies = 'agencies',
  types = 'types',
  status = 'status',
  option = 'option',
  value = 'value',
}
