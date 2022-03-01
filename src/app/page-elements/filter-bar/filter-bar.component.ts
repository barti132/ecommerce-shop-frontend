import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  @Input() producers: String[] = [];
  @Output() activeFilters = new EventEmitter<NgForm>();

  constructor() {
  }

  ngOnInit(): void {
  }

  reloadPage(): void {
    window.location.reload();
  }

  public sendFilters(form: NgForm): void {
    this.activeFilters.emit(form);
  }

}
