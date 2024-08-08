import * as tslib_1 from "tslib";
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
let Renderer = class Renderer {
    constructor(platformId) {
        this.platformId = platformId;
    }
    invokeElementMethod(eleRef, method) {
        if (isPlatformBrowser(this.platformId)) {
            eleRef.nativeElement[method]();
        }
    }
};
Renderer.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
Renderer = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(PLATFORM_ID))
], Renderer);
export { Renderer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kYXRldGltZS1waWNrZXIvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9yZW5kZXJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHcEQsSUFBYSxRQUFRLEdBQXJCO0lBQ0ksWUFDaUMsVUFBa0I7UUFBbEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtJQUduRCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsTUFBa0IsRUFBRSxNQUFjO1FBQ2xELElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUNsQztJQUNMLENBQUM7Q0FDSixDQUFBOztZQVZnRCxNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVzs7QUFGZCxRQUFRO0lBRHBCLFVBQVUsRUFBRTtJQUdKLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQUZmLFFBQVEsQ0FZcEI7U0FaWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgUExBVEZPUk1fSUQsIEluamVjdCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdFxuICAgICkge1xuXG4gICAgfVxuXG4gICAgaW52b2tlRWxlbWVudE1ldGhvZChlbGVSZWY6IEVsZW1lbnRSZWYsIG1ldGhvZDogc3RyaW5nKTp2b2lkIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGVsZVJlZi5uYXRpdmVFbGVtZW50W21ldGhvZF0oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==