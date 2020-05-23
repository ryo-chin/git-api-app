import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingWaveComponent } from './atoms/loading-wave/loading-wave.component';
import { ButtonModule, DropdownModule } from 'primeng';
import { ButtonComponent } from './atoms/button/button.component';
import { DropdownComponent } from './atoms/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoadingWaveComponent,
    ButtonComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    FormsModule
  ],
  exports: [
    LoadingWaveComponent,
    ButtonComponent,
    DropdownComponent
  ]
})
export class UiLibsModule { }
