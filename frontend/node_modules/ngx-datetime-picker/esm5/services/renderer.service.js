import * as tslib_1 from "tslib";
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
var Renderer = /** @class */ (function () {
    function Renderer(platformId) {
        this.platformId = platformId;
    }
    Renderer.prototype.invokeElementMethod = function (eleRef, method) {
        if (isPlatformBrowser(this.platformId)) {
            eleRef.nativeElement[method]();
        }
    };
    Renderer.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    Renderer = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(PLATFORM_ID))
    ], Renderer);
    return Renderer;
}());
export { Renderer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kYXRldGltZS1waWNrZXIvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9yZW5kZXJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHcEQ7SUFDSSxrQkFDaUMsVUFBa0I7UUFBbEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtJQUduRCxDQUFDO0lBRUQsc0NBQW1CLEdBQW5CLFVBQW9CLE1BQWtCLEVBQUUsTUFBYztRQUNsRCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNwQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDbEM7SUFDTCxDQUFDOztnQkFUNEMsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7O0lBRmQsUUFBUTtRQURwQixVQUFVLEVBQUU7UUFHSixtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7T0FGZixRQUFRLENBWXBCO0lBQUQsZUFBQztDQUFBLEFBWkQsSUFZQztTQVpZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBQTEFURk9STV9JRCwgSW5qZWN0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0XG4gICAgKSB7XG5cbiAgICB9XG5cbiAgICBpbnZva2VFbGVtZW50TWV0aG9kKGVsZVJlZjogRWxlbWVudFJlZiwgbWV0aG9kOiBzdHJpbmcpOnZvaWQge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgZWxlUmVmLm5hdGl2ZUVsZW1lbnRbbWV0aG9kXSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19