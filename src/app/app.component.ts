import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'cashback';
  constructor(
    private _gtmService: GoogleTagManagerService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.deleteAllCookies();
    _gtmService.addGtmToDom();
  }

  deleteAllCookies() {
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  }
}
