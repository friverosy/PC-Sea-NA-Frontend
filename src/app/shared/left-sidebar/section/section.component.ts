import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sidebar-section',
  templateUrl: './section.component.html'
})
export class SectionComponent implements OnInit {
  @Input() sectionName: string;
  @Input() linkTo: string;
  @Input() iconClass: string;
  @Input() badgeClass: string;
  @Input() badgeValue: number;
  
  @Output() clickEvent = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }  
  
  click() {
    this.clickEvent.emit();
  }  
}
