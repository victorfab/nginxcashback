import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({ providedIn: 'root' })
export class CallbacksService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private deviceService: DeviceDetectorService
  ) {}

  nativeWindow(): Window | null {
    return this.document.defaultView;
  }

  openUrlAndCloseSession(url: string): void {
    if (!this.deviceService.isDesktop()) {
      if (typeof (this.nativeWindow() as any).webkit !== 'undefined') {
        const params = {
          name: 'openUrlAndCloseSession',
          parameters: {
            url: url
          },
          callbackName: null
        };
        // iOs
        (this.nativeWindow() as any).webkit.messageHandlers.Connect.postMessage(
          JSON.stringify(params)
        );
      } else {
        // Android
        (this.nativeWindow() as any).Connect.openUrlAndCloseSession(url);
      }
    }
  }

  goToRoot(): void {
    if (!this.deviceService.isDesktop()) {
      if (typeof (this.nativeWindow() as any).webkit !== 'undefined') {
        //iOs
        const params = {
          name: 'goToRoot',
          parameters: null,
          callbackName: null
        };
        (this.nativeWindow() as any).webkit.messageHandlers.Connect.postMessage(
          JSON.stringify(params)
        );
      } else {
        // Android
        (this.nativeWindow() as any).Connect.goToRoot();
      }
    }
  }
}
