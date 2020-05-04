import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule, DataViewModule } from 'primeng';
import { HttpClientModule } from '@angular/common/http';
import { CommitListPageComponent } from './features/commits/pages/commit-list-page/commit-list-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CommitListPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    DataViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
