import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularDateTimePickerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
