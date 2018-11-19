export enum ActionTypes {
  initAgencies,
  initStatus,
  initTypes,
  initLaunches,
  changeOption,
  changeValue
}
export interface Action {
  readonly type: ActionTypes;
  readonly payload?: any;
}

export class InitAgencies implements Action {
    public type = ActionTypes.initAgencies;
    constructor(public readonly payload?: any) { }
}
export class InitStatus implements Action {
  public type = ActionTypes.initStatus;
  constructor(public readonly payload?: any) { }
}
export class InitTypes implements Action {
  public type = ActionTypes.initTypes;
  constructor(public readonly payload?: any) { }
}
export class InitLaunches implements Action {
  public type = ActionTypes.initLaunches;
  constructor(public readonly payload?: any) { }
}
export class ChangeOption implements Action {
  public type = ActionTypes.changeOption;
  constructor(public readonly payload?: any) { }
}
export class ChangeValue implements Action {
  public type = ActionTypes.changeValue;
  constructor(public readonly payload?: any) { }
}
export type Actions = InitAgencies | InitStatus | InitTypes | InitLaunches | ChangeOption | ChangeValue;
