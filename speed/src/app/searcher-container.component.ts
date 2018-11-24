import { Component, OnInit } from '@angular/core';
import { ApiService } from "./api.service";
import { SlideTypes, StoreService } from "./store.service";
import { ChangeOption, ChangeValue, LoadAgencies, LoadLaunches, LoadStatus, LoadTypes } from "./store.actions";
import { Launch } from "./store/models/launch";
import { Agency } from "./store/models/agency";
import { MissionType } from "./store/models/mission-type";
import { Status } from "./store/models/status";

@Component({
  selector: 'app-searcher-container',
  template: `
    <app-search-options-presenter 
      (option)="onSelectedOption($event)">
    </app-search-options-presenter>
    <app-search-values-presenter 
      [searchValues]="selectedSearchValues"
      (value)="onSelectedValue($event)">
    </app-search-values-presenter>
    <app-search-result-presenter 
      [launches]="filteredLaunches">
    </app-search-result-presenter>
  `,
  styles: []
})
export class SearcherContainerComponent implements OnInit {
  public selectedSearchValues: Agency[] | MissionType[] | Status[] = [];
  public filteredLaunches: Launch[] = [];

  constructor(private api: ApiService, private store: StoreService) { }

  ngOnInit() {
    this.initData();
    this.store.select$(SlideTypes.option)
      .subscribe(option => this.selectedSearchValues = this.selectSearchValues(option));
    this.store.select$(SlideTypes.value)
      .subscribe(value => {
        this.filteredLaunches = this.filterLaunches(
          this.store.selectSnapShot(SlideTypes.option),
          value,
          this.store.selectSnapShot(SlideTypes.launches))
      });
  }

  private initData = () => {
    this.api.getAgencies().subscribe(agencies =>
      this.store.dispatch(new LoadAgencies(agencies))
    );
    this.api.getStatus().subscribe(status =>
      this.store.dispatch(new LoadStatus(status))
    );
    this.api.getTypes().subscribe(types =>
      this.store.dispatch(new LoadTypes(types))
    );
    this.api.getLaunches().subscribe(launches =>
      this.store.dispatch(new LoadLaunches(launches))
    );
  };

  public onSelectedOption = ($event) => {
    this.store.dispatch(new ChangeOption($event));
  };

  public onSelectedValue = ($event) => {
    this.store.dispatch(new ChangeValue($event))
  };

  private selectSearchValues(option: SlideTypes): Agency[] | MissionType[] | Status[] {
    this.filteredLaunches = [];
    if (option != '') {
      return this.store.selectSnapShot(option);
    }else{
      return [];
    }
  }

  private filterLaunches(option: SlideTypes, value: number, launches: Launch[]): Launch[] {
    if (option != '' && value != 0) {
      switch (option) {
        case SlideTypes.agencies:
          return this.filterByAgency(value, launches);
        case SlideTypes.types:
          return this.filterByType(value, launches);
        case SlideTypes.status:
          return this.filterByStatus(value, launches);
        default:
          return [];
      }
    }else{
      return [];
    }
  }

  private filterByAgency(value: number, launches: Launch[]) {
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

  private filterByType(value: number, launches: Launch[]) {
    return launches.filter(launch =>
      launch.missions[0] && launch.missions[0].type == value
      // launch.missions.some( mission => mission.type == value )
    )
  }

  private filterByStatus(value: number, launches: Launch[]) {
    return launches.filter(launch =>
      launch.status == value
    )
  }

}
