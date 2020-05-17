import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingWaveComponent } from './atoms/loading-wave/loading-wave.component';
import { ButtonModule } from 'primeng';
import { ButtonComponent } from './atoms/button/button.component';



@NgModule({
  declarations: [
    LoadingWaveComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    LoadingWaveComponent,
    ButtonComponent
  ]
})
export class UiLibsModule { }
