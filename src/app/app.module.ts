import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FlameTheme,
  FlameThemeService,
  FlameThemeModule
} from '@ngx-mxflame/atoms/theme';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { register } from 'swiper/element/bundle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
registerLocaleData(localeEsMx, 'es-MX');
register();

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlameThemeModule.forRoot({
      themes: [FlameTheme],
      default: FlameTheme
    }),
    GoogleTagManagerModule.forRoot({
      id: 'GTM-W33LPS5'
    }),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    AppRoutingModule
  ],
  providers: [FlameThemeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
