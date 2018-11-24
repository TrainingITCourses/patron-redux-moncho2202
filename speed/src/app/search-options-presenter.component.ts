import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SlideTypes } from "./store.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search-options-presenter',
  template: `
    <select (change)="selectedOption($event.target.value)">
      <option value="">Select an option</option>
      <option value="{{ SliceTypes.agencies }}">{{ SliceTypes.agencies }}</option>
      <option value="{{ SliceTypes.types }}">{{ SliceTypes.types }}</option>
      <option value="{{ SliceTypes.status }}">{{ SliceTypes.status }}</option>
    </select>
  `,
  styles: []
})
export class SearchOptionsPresenterComponent implements OnInit {
  @Output() public option = new EventEmitter();
  SliceTypes = SlideTypes;

  constructor() { }

  ngOnInit() { }

  public selectedOption = (option) => {
    this.option.emit(option);
  };
}

