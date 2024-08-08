import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var IsMobileService = /** @class */ (function () {
    function IsMobileService() {
        this.isMobile = !!(window.navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            || navigator.userAgent.match(/Opera Mini/i)
            || navigator.userAgent.match(/IEMobile/i));
    }
    IsMobileService = tslib_1.__decorate([
        Injectable()
    ], IsMobileService);
    return IsMobileService;
}());
export { IsMobileService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNNb2JpbGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kYXRldGltZS1waWNrZXIvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pc01vYmlsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDO0lBR0M7UUFDTyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7ZUFDaEQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2VBQ25DLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztlQUNwQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7ZUFDbEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2VBQ2xDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztlQUN4QyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztlQUMzQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7ZUFDeEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBYlcsZUFBZTtRQUQzQixVQUFVLEVBQUU7T0FDQSxlQUFlLENBYzNCO0lBQUQsc0JBQUM7Q0FBQSxBQWRELElBY0M7U0FkWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSXNNb2JpbGVTZXJ2aWNlIHtcblx0cHVibGljIGlzTW9iaWxlOiBib29sZWFuO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlzTW9iaWxlID0gISEod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSlcbiAgICAgICAgICAgICAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvd2ViT1MvaSlcbiAgICAgICAgICAgICAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lL2kpXG4gICAgICAgICAgICAgICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSlcbiAgICAgICAgICAgICAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKVxuICAgICAgICAgICAgICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpXG4gICAgICAgICAgICAgICAgICAgIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmUvaSlcbiAgICAgICAgICAgICAgICAgICAgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvT3BlcmEgTWluaS9pKVxuICAgICAgICAgICAgICAgICAgICB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9JRU1vYmlsZS9pKSk7XG5cdH1cbn1cbiJdfQ==