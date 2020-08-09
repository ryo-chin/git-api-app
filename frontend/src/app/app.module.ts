import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule, CalendarModule, DataViewModule } from 'primeng';
import { HttpClientModule } from '@angular/common/http';
import { CommitListPageComponent } from './features/commits/pages/commit-list-page/commit-list-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiLibsModule } from './ui-libs/ui-libs.module';
import { ResaleListPageComponent } from './features/resale/pages/resale-list-page/resale-list-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CommitListPageComponent,
    ResaleListPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    DataViewModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    UiLibsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
