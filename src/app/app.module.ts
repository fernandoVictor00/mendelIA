import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import localePt from '@angular/common/locales/pt';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  imports: [CommonModule, AppRoutingModule, BrowserModule,HttpClientModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ],
})
export class AppModule {}
