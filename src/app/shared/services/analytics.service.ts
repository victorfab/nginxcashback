import { Inject, Injectable } from '@angular/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { DOCUMENT } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Product } from '../intefaces/product';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(
    private _gtm: GoogleTagManagerService,
    @Inject(DOCUMENT) document: any,
    private deviceService: DeviceDetectorService
  ) {}

  public pageView(
    titulo: string,
    customerKey: string,
    currentProduct: Product
  ): void {
    this._gtm.pushTag({
      url: titulo,
      titulo,
      tipoSitio: 'Privado',
      idiomaPagina: 'Espanol',
      canalBanco: 'cashback',
      versionApp: '1.0.0',
      marca_dispositivo: this.deviceService.getDeviceInfo().device,
      sistema_operativo: this.deviceService.getDeviceInfo().os,
      tipoDispositivo: this.deviceService.isDesktop() ? 'Desktop' : 'Movil',
      userId: customerKey,
      tarjeta_credito: currentProduct?.product?.name,
      event: 'PageView'
    });
  }

  public eventTag(
    gaEventAction: string,
    gaEventLabel: string,
    currentProduct: Product
  ): void {
    this._gtm.pushTag({
      event: 'cashback',
      gaEventCategory: 'cashback',
      gaEventAction,
      gaEventLabel,
      periodicidad: '',
      marca: ''
    });
  }
}
