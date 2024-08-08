import { ElementRef } from '@angular/core';
export declare class Renderer {
    private platformId;
    constructor(platformId: Object);
    invokeElementMethod(eleRef: ElementRef, method: string): void;
}
