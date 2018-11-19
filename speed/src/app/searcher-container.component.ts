import { Component, OnInit } from '@angular/core';
import { ApiService } from "./api.service";
import { initialState, State, StoreService} from "./store.service";
import { ChangeOption, ChangeValue, InitAgencies, InitLaunches, InitStatus, InitTypes } from "./store.actions";

@Component({
  selector: 'app-searcher-container',
  template: `
    <app-search-options-presenter 
      (option)="onSelectedOption($event)">
    </app-search-options-presenter>
    <app-search-values-presenter 
      [searchValues]="searcher.selectedSearchValues"
      (value)="onSelectedValue($event)">
    </app-search-values-presenter>
    <app-search-result-presenter 
      [launches]="searcher.filteredLaunches">
    </app-search-result-presenter>
  `,
  styles: []
})
export class SearcherContainerComponent implements OnInit {
  public searcher: State = initialState;

  constructor(private api: ApiService, private store: StoreService) { }

  ngOnInit() {
    this.initData();
    this.store
        .select$()
        .subscribe(state => (this.searcher = state));
  }

  private initData = () => {
    this.api.getAgencies().subscribe(agencies =>
      this.store.dispatch(new InitAgencies(agencies))
    );
    this.api.getStatus().subscribe(status =>
      this.store.dispatch(new InitStatus(status))
    );
    this.api.getTypes().subscribe(types =>
      this.store.dispatch(new InitTypes(types))
    );
    this.api.getLaunches().subscribe(launches =>
      this.store.dispatch(new InitLaunches(launches))
    );
  };

  public onSelectedOption = ($event) => {
    this.store.dispatch(new ChangeOption($event));
  };

  public onSelectedValue = ($event) => {
    this.store.dispatch(new ChangeValue($event))
  };
}
