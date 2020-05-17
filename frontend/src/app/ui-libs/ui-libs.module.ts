import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingWaveComponent } from './atoms/loading-wave/loading-wave.component';



@NgModule({
  declarations: [
    LoadingWaveComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingWaveComponent
  ]
})
export class UiLibsModule { }
