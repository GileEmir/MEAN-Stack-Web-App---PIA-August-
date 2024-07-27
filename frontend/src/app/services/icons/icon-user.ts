import { Component, Input, ViewChild, ViewContainerRef } from "@angular/core";
@Component({
 
  selector: "icon-user",
  template: `
    <ng-template #template>
     <svg width="1.125em" height="1.125em" viewBox="0 0 18 18" fill="none" style="position: absolute; top: 50%; right: 2%; transform: translateY(-50%); z-index: 10; pointer-events: none;">
              <circle cx="9" cy="4.5" r="3" fill="currentColor" />
              <path opacity="0.5" d="M15 13.125C15 14.989 15 16.5 9 16.5C3 16.5 3 14.989 3 13.125C3 11.261 5.68629 9.75 9 9.75C12.3137 9.75 15 11.261 15 13.125Z" fill="currentColor" />
            </svg>
    </ng-template>
  `,
})
export class IconUserComponent {
  @Input() fill: boolean = false;
  @Input() class: any = "";
  @ViewChild("template", { static: true }) template: any;
  constructor(private viewContainerRef: ViewContainerRef) {}
  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
    this.viewContainerRef.element.nativeElement.remove();
  }
}
