export enum ActionTypes {
  LoadAgencies = '[State] LoadAgencies',
  LoadStatus = '[State] LoadStatus',
  LoadTypes = '[State] LoadTypes',
  LoadLaunches = '[State] LoadLaunches',
  ChangeOption = '[State] ChangeOption',
  ChangeValue = '[State] ChangeValue'
}
export interface Action {
  readonly type: ActionTypes;
  readonly payload?: any;
}

export class LoadAgencies implements Action {
    public type = ActionTypes.LoadAgencies;
    constructor(public readonly payload: any) { }
}
export class LoadStatus implements Action {
  public type = ActionTypes.LoadStatus;
  constructor(public readonly payload: any) { }
}
export class LoadTypes implements Action {
  public type = ActionTypes.LoadTypes;
  constructor(public readonly payload: any) { }
}
export class LoadLaunches implements Action {
  public type = ActionTypes.LoadLaunches;
  constructor(public readonly payload: any) { }
}
export class ChangeOption implements Action {
  public type = ActionTypes.ChangeOption;
  constructor(public readonly payload: any) { }
}
export class ChangeValue implements Action {
  public type = ActionTypes.ChangeValue;
  constructor(public readonly payload: any) { }
}
export type Actions = LoadAgencies | LoadStatus | LoadTypes | LoadLaunches | ChangeOption | ChangeValue;
