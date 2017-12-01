import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToasterModule } from 'angular2-toaster';
import { ModalModule } from 'ngx-modialog';
import { VexModalModule } from 'ngx-modialog/plugins/vex';

import { reducer } from './store';
import { BankEffects } from './bank/store/bank.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InfoToasterService } from './core/services/info-toaster.service';
import { BankModule } from './bank/bank.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BankModule,
    ModalModule.forRoot(),
    VexModalModule,
    ToasterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducer),
    EffectsModule.forRoot([BankEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 50
    })
  ],
  providers: [InfoToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
