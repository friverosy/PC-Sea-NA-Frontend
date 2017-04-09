import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sidebar-group-section',
  templateUrl: './group-section.component.html'
})
export class GroupSectionComponent implements OnInit {
  @Input() sectionName: string;
  @Input() iconClass: string;

  isOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
