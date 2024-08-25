import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
  selector: "icon-gear",
  template: `
    <ng-template #template>
      <svg
        class="icon-gear"
        width="40px"
        height="40px"
        viewBox="0 0 32 32"
        enable-background="new 0 0 32 32"
        id="Editable-line"
        version="1.1"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        (click)="handleClick()"
        style="cursor: pointer;"
      >
        <circle
          cx="16"
          cy="16"
          fill="none"
          id="XMLID_224_"
          r="4"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />
        <path
          d="M27.758,10.366l-1-1.732c-0.552-0.957-1.775-1.284-2.732-0.732L23.5,8.206C21.5,9.36,19,7.917,19,5.608V5c0-1.105-0.895-2-2-2h-2c-1.105,0-2,0.895-2,2v0.608c0,2.309-2.5,3.753-4.5,2.598L7.974,7.902C7.017,7.35,5.794,7.677,5.242,8.634l-1,1.732c-0.552,0.957-0.225,2.18,0.732,2.732L5.5,13.402c2,1.155,2,4.041,0,5.196l-0.526,0.304c-0.957,0.552-1.284,1.775-0.732,2.732l1,1.732c0.552,0.957,1.775,1.284,2.732,0.732L8.5,23.794c2-1.155,4.5,0.289,4.5,2.598V27c0,1.105,0.895,2,2,2h2c1.105,0,2-0.895,2-2v-0.608c0-2.309,2.5-3.753,4.5-2.598l0.526,0.304c0.957,0.552,2.18,0.225,2.732-0.732l1-1.732c0.552-0.957,0.225-2.18-0.732-2.732L26.5,18.598c-2-1.155-2-4.041,0-5.196l0.526-0.304C27.983,12.546,28.311,11.323,27.758,10.366z"
          fill="none"
          id="XMLID_242_"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />
      </svg>
    </ng-template>
  `,
  styles: [`
    .icon-gear {
      transition: transform 0.3s ease, fill 0.3s ease; /* Smooth transition for transform and fill */
    }

    .icon-gear:hover {
      transform: rotate(20deg) scale(1.1); /* Rotate and scale on hover */
      fill: #58c519; /* Change fill color on hover */
    }
  `]
})
export class IconGearComponent {
  @Input() fill: boolean = false;
  @Input() class: any = "";
  @ViewChild("template", { static: true }) template: any;
  constructor(private viewContainerRef: ViewContainerRef) {}
  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
    this.viewContainerRef.element.nativeElement.remove();
  }

  @Output() click = new EventEmitter<void>();

  handleClick() {
    this.click.emit();
  }
}