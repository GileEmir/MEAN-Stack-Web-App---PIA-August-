import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() toggle = new EventEmitter<void>();

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit();
  }
}